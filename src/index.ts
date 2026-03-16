#!/usr/bin/env node

/**
 * Ashby MCP Server
 *
 * A Model Context Protocol server that provides full access to the Ashby
 * recruiting API. Designed for use with Claude Desktop or any MCP client.
 *
 * Authentication: Set ASHBY_API_KEY environment variable.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { AshbyClient } from "./ashby-client.js";
import { allTools, type ToolDefinition } from "./tools.js";

// ─── Bootstrap ────────────────────────────────────────────────────────────────

const apiKey = process.env.ASHBY_API_KEY;
if (!apiKey) {
  console.error(
    "Error: ASHBY_API_KEY environment variable is required.\n" +
      "Generate one at: Ashby → Admin → API Keys"
  );
  process.exit(1);
}

const client = new AshbyClient(apiKey);

const server = new McpServer({
  name: "ashby",
  version: "1.0.0",
});

// ─── Convert JSON Schema properties to Zod shapes ────────────────────────────

function jsonSchemaPropertyToZod(prop: Record<string, unknown>): z.ZodTypeAny {
  const type = prop.type as string | undefined;

  switch (type) {
    case "string": {
      let schema = z.string();
      if (prop.description) schema = schema.describe(prop.description as string);
      if (prop.enum) {
        return z.enum(prop.enum as [string, ...string[]]).describe(
          (prop.description as string) ?? ""
        );
      }
      return schema;
    }
    case "number":
    case "integer": {
      let schema = z.number();
      if (prop.description) schema = schema.describe(prop.description as string);
      return schema;
    }
    case "boolean": {
      let schema = z.boolean();
      if (prop.description) schema = schema.describe(prop.description as string);
      return schema;
    }
    case "array": {
      const itemSchema = prop.items
        ? jsonSchemaPropertyToZod(prop.items as Record<string, unknown>)
        : z.unknown();
      let schema = z.array(itemSchema);
      if (prop.description) schema = schema.describe(prop.description as string);
      return schema;
    }
    case "object": {
      if (prop.properties) {
        const shape: Record<string, z.ZodTypeAny> = {};
        const properties = prop.properties as Record<
          string,
          Record<string, unknown>
        >;
        const requiredKeys = new Set(
          (prop.required as string[] | undefined) ?? []
        );
        for (const [key, val] of Object.entries(properties)) {
          const zodType = jsonSchemaPropertyToZod(val);
          shape[key] = requiredKeys.has(key) ? zodType : zodType.optional();
        }
        let schema = z.object(shape).passthrough();
        if (prop.description)
          schema = schema.describe(prop.description as string);
        return schema;
      }
      let schema = z.record(z.string(), z.unknown());
      if (prop.description) schema = schema.describe(prop.description as string);
      return schema;
    }
    default:
      return z.unknown().describe((prop.description as string) ?? "");
  }
}

function buildZodShape(
  tool: ToolDefinition
): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  const required = new Set(tool.inputSchema.required ?? []);

  for (const [key, prop] of Object.entries(tool.inputSchema.properties)) {
    const propDef = prop as Record<string, unknown>;
    const zodType = jsonSchemaPropertyToZod(propDef);
    shape[key] = required.has(key) ? zodType : zodType.optional();
  }

  return shape;
}

// ─── Register all tools ───────────────────────────────────────────────────────

for (const tool of allTools) {
  const zodShape = buildZodShape(tool);

  server.tool(
    tool.name,
    tool.description,
    zodShape,
    async (params: Record<string, unknown>) => {
      try {
        // Strip undefined values before sending to the API
        const body: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(params)) {
          if (v !== undefined) body[k] = v;
        }

        const result = await client.request(tool.endpoint, body);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Error: ${message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}

// ─── Start server ─────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Ashby MCP server running — ${allTools.length} tools registered`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
