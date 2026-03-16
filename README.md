# Ashby MCP Server

A Model Context Protocol (MCP) server providing full access to the [Ashby](https://www.ashbyhq.com/) recruiting API. Use it with Claude Desktop, Claude Code, or any MCP-compatible client.

## Setup

### 1. Install dependencies and build

```bash
cd ashby-mcp-server
npm install
npm run build
```

### 2. Get your Ashby API key

Go to **Ashby → Admin → Developer → API Keys** and create a new key with the permissions you need (e.g. `candidatesRead`, `candidatesWrite`, `jobsRead`, `offersWrite`, etc.).

### 3. Configure Claude Desktop

Edit your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add this entry under `mcpServers`:

```json
{
  "mcpServers": {
    "ashby": {
      "command": "node",
      "args": ["/absolute/path/to/ashby-mcp-server/dist/index.js"],
      "env": {
        "ASHBY_API_KEY": "your-ashby-api-key-here"
      }
    }
  }
}
```

### 4. Restart Claude Desktop

The Ashby tools should now appear in your tool list.

## Available Tools (67 total)

### Candidates (15 tools)
`ashby_candidate_create`, `ashby_candidate_info`, `ashby_candidate_list`, `ashby_candidate_search`, `ashby_candidate_update`, `ashby_candidate_create_note`, `ashby_candidate_list_notes`, `ashby_candidate_add_tag`, `ashby_candidate_remove_tag`, `ashby_candidate_add_project`, `ashby_candidate_remove_project`, `ashby_candidate_list_projects`, `ashby_candidate_anonymize`, `ashby_candidate_upload_resume`, `ashby_candidate_upload_file`

### Applications (12 tools)
`ashby_application_create`, `ashby_application_info`, `ashby_application_list`, `ashby_application_update`, `ashby_application_change_stage`, `ashby_application_change_source`, `ashby_application_transfer`, `ashby_application_hire`, `ashby_application_add_hiring_team_member`, `ashby_application_remove_hiring_team_member`, `ashby_application_list_criteria_evaluations`, `ashby_application_list_history`

### Jobs (6 tools)
`ashby_job_create`, `ashby_job_info`, `ashby_job_list`, `ashby_job_search`, `ashby_job_update`, `ashby_job_set_status`

### Job Postings (2 tools)
`ashby_job_posting_info`, `ashby_job_posting_list`

### Offers (5 tools)
`ashby_offer_create`, `ashby_offer_info`, `ashby_offer_list`, `ashby_offer_update`, `ashby_offer_start_approval_process`

### Interview Schedules (4 tools)
`ashby_interview_schedule_create`, `ashby_interview_schedule_list`, `ashby_interview_schedule_update`, `ashby_interview_schedule_cancel`

### Interview Plans & Stages (2 tools)
`ashby_interview_stage_list`, `ashby_interview_plan_list`

### Organization (14 tools)
`ashby_department_list`, `ashby_department_info`, `ashby_department_create`, `ashby_location_list`, `ashby_location_info`, `ashby_location_create`, `ashby_location_archive`, `ashby_location_restore`, `ashby_user_list`, `ashby_user_info`, `ashby_user_search`, `ashby_source_list`, `ashby_candidate_tag_list`, `ashby_archive_reason_list`

### Openings (3 tools)
`ashby_opening_list`, `ashby_opening_info`, `ashby_opening_create`

### Projects (3 tools)
`ashby_project_list`, `ashby_project_info`, `ashby_project_create`

### Custom Fields (2 tools)
`ashby_custom_field_list`, `ashby_custom_field_set_value`

### Webhooks (4 tools)
`ashby_webhook_create`, `ashby_webhook_list`, `ashby_webhook_update`, `ashby_webhook_delete`

### Feedback & Scorecards (2 tools)
`ashby_feedback_form_definition_list`, `ashby_feedback_form_submit`

### Other (3 tools)
`ashby_assessment_list`, `ashby_offer_form_definition_list`, `ashby_approval_definition_list`, `ashby_hiring_team_role_list`

## API Reference

This server wraps the [Ashby API](https://developers.ashbyhq.com/reference/introduction). All endpoints use POST with JSON bodies and Basic authentication.
