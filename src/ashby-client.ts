/**
 * Ashby API Client
 *
 * Handles authentication and HTTP communication with the Ashby API.
 * All Ashby endpoints are RPC-style POST requests to https://api.ashbyhq.com/<resource>.<action>
 */

const ASHBY_API_BASE = "https://api.ashbyhq.com";
const USER_AGENT = "ashby-mcp-server/1.0.0";

/** Maximum number of retries for transient (5xx / network) errors. */
const MAX_RETRIES = 2;

/** Base delay in ms between retries (doubled on each attempt). */
const RETRY_BASE_DELAY_MS = 500;

export class AshbyClient {
  private authHeader: string;

  constructor(apiKey: string) {
    // Ashby uses Basic auth with the API key as the username and empty password
    this.authHeader =
      "Basic " + Buffer.from(apiKey + ":").toString("base64");
  }

  async request(endpoint: string, body: Record<string, unknown> = {}): Promise<unknown> {
    const url = `${ASHBY_API_BASE}/${endpoint}`;
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      let response: Response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            Accept: "application/json",
            Authorization: this.authHeader,
          },
          body: JSON.stringify(body),
        });
      } catch (err) {
        // Network error – retry if attempts remain
        lastError = err instanceof Error ? err : new Error(String(err));
        continue;
      }

      // Retry on 5xx server errors
      if (response.status >= 500 && attempt < MAX_RETRIES) {
        lastError = new Error(
          `Ashby API error (HTTP ${response.status}): ${await response.text()}`
        );
        continue;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Ashby API error (HTTP ${response.status}): ${text}`
        );
      }

      const data = (await response.json()) as {
        success: boolean;
        results?: unknown;
        moreDataAvailable?: boolean;
        nextCursor?: string;
        errors?: string[];
        errorInfo?: { code: string; message: string; requestId: string };
      };

      if (!data.success) {
        const msg =
          data.errorInfo?.message ?? data.errors?.join(", ") ?? "Unknown error";
        throw new Error(`Ashby API error: ${msg}`);
      }

      // Include pagination metadata when present so callers can page through results
      if (data.moreDataAvailable !== undefined) {
        return {
          results: data.results,
          moreDataAvailable: data.moreDataAvailable,
          nextCursor: data.nextCursor ?? null,
        };
      }

      return data.results;
    }

    // All retries exhausted
    throw lastError ?? new Error("Ashby API request failed after retries");
  }
}
