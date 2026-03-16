/**
 * Ashby MCP Tool Definitions
 *
 * Comprehensive tool definitions covering all major Ashby API endpoints.
 * Each tool maps to one Ashby RPC endpoint.
 */

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  endpoint: string;
}

// ─── Candidate Tools ──────────────────────────────────────────────────────────

export const candidateTools: ToolDefinition[] = [
  {
    name: "ashby_candidate_create",
    description:
      "Create a new candidate in Ashby. Returns the created candidate object.",
    inputSchema: {
      type: "object",
      properties: {
        firstName: { type: "string", description: "Candidate first name" },
        lastName: { type: "string", description: "Candidate last name" },
        primaryEmailAddress: {
          type: "string",
          description: "Primary email address",
        },
        primaryPhoneNumber: {
          type: "string",
          description: "Primary phone number",
        },
        socialLinks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              type: {
                type: "string",
                enum: ["LinkedIn", "GitHub", "Twitter", "Other"],
              },
            },
          },
          description: "Social profile links",
        },
      },
      required: ["firstName", "lastName"],
    },
    endpoint: "candidate.create",
  },
  {
    name: "ashby_candidate_info",
    description:
      "Get detailed information about a specific candidate by ID.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Candidate UUID" },
      },
      required: ["id"],
    },
    endpoint: "candidate.info",
  },
  {
    name: "ashby_candidate_list",
    description:
      "List all candidates with pagination support. Use cursor-based pagination with 'after' parameter.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Max results per page (default 100)",
        },
        cursor: {
          type: "string",
          description: "Pagination cursor (pass nextCursor from previous response)",
        },
      },
    },
    endpoint: "candidate.list",
  },
  {
    name: "ashby_candidate_search",
    description:
      "Search candidates by name and/or email. Returns up to 100 results. Useful for autocomplete or lookup.",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "Email to search for" },
        name: { type: "string", description: "Name to search for" },
      },
    },
    endpoint: "candidate.search",
  },
  {
    name: "ashby_candidate_update",
    description: "Update an existing candidate's information.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Candidate UUID" },
        firstName: { type: "string", description: "Updated first name" },
        lastName: { type: "string", description: "Updated last name" },
        primaryEmailAddress: {
          type: "string",
          description: "Updated primary email",
        },
        primaryPhoneNumber: {
          type: "string",
          description: "Updated primary phone",
        },
        socialLinks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              type: { type: "string" },
            },
          },
          description: "Updated social links",
        },
      },
      required: ["id"],
    },
    endpoint: "candidate.update",
  },
  {
    name: "ashby_candidate_create_note",
    description: "Add a note to a candidate's profile.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        note: { type: "string", description: "Note content (HTML supported)" },
      },
      required: ["candidateId", "note"],
    },
    endpoint: "candidate.createNote",
  },
  {
    name: "ashby_candidate_list_notes",
    description: "List all notes for a specific candidate.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
      },
      required: ["candidateId"],
    },
    endpoint: "candidate.listNotes",
  },
  {
    name: "ashby_candidate_add_tag",
    description: "Add a tag to a candidate.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        tagId: { type: "string", description: "Tag UUID to add" },
      },
      required: ["candidateId", "tagId"],
    },
    endpoint: "candidate.addTag",
  },
  {
    name: "ashby_candidate_remove_tag",
    description: "Remove a tag from a candidate.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        tagId: { type: "string", description: "Tag UUID to remove" },
      },
      required: ["candidateId", "tagId"],
    },
    endpoint: "candidate.removeTag",
  },
  {
    name: "ashby_candidate_add_project",
    description: "Add a candidate to a project.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        projectId: { type: "string", description: "Project UUID" },
      },
      required: ["candidateId", "projectId"],
    },
    endpoint: "candidate.addProject",
  },
  {
    name: "ashby_candidate_remove_project",
    description: "Remove a candidate from a project.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        projectId: { type: "string", description: "Project UUID" },
      },
      required: ["candidateId", "projectId"],
    },
    endpoint: "candidate.removeProject",
  },
  {
    name: "ashby_candidate_list_projects",
    description: "List all projects a candidate belongs to.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
      },
      required: ["candidateId"],
    },
    endpoint: "candidate.listProjects",
  },
  {
    name: "ashby_candidate_list_client_info",
    description:
      "List client interaction records for a candidate — shows when they opened scheduling links, submitted applications, etc. Useful for tracking candidate engagement and activity.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
      },
      required: ["candidateId"],
    },
    endpoint: "candidate.listClientInfo",
  },
  {
    name: "ashby_candidate_anonymize",
    description:
      "Anonymize a candidate's data for GDPR compliance. This is irreversible.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
      },
      required: ["candidateId"],
    },
    endpoint: "candidate.anonymize",
  },
  {
    name: "ashby_candidate_upload_resume",
    description: "Upload a resume file for a candidate (base64 encoded).",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        file: {
          type: "string",
          description: "Base64-encoded file content",
        },
        fileName: {
          type: "string",
          description: "Name of the file including extension",
        },
      },
      required: ["candidateId", "file", "fileName"],
    },
    endpoint: "candidate.uploadResume",
  },
  {
    name: "ashby_candidate_upload_file",
    description: "Upload a generic file to a candidate's profile.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        file: {
          type: "string",
          description: "Base64-encoded file content",
        },
        fileName: {
          type: "string",
          description: "Name of the file including extension",
        },
      },
      required: ["candidateId", "file", "fileName"],
    },
    endpoint: "candidate.uploadFile",
  },
];

// ─── Application Tools ────────────────────────────────────────────────────────

export const applicationTools: ToolDefinition[] = [
  {
    name: "ashby_application_create",
    description:
      "Create a new application — associates a candidate with a job.",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", description: "Candidate UUID" },
        jobId: { type: "string", description: "Job UUID" },
        interviewPlanId: {
          type: "string",
          description: "Interview plan UUID (optional, defaults to job's plan)",
        },
        interviewStageId: {
          type: "string",
          description:
            "Starting stage UUID or 'FirstPreInterviewScreen'",
        },
        sourceId: {
          type: "string",
          description: "Application source UUID",
        },
        creditedToUserId: {
          type: "string",
          description: "User UUID to credit the application to",
        },
        createdAt: {
          type: "string",
          description: "ISO 8601 creation timestamp (defaults to now)",
        },
      },
      required: ["candidateId", "jobId"],
    },
    endpoint: "application.create",
  },
  {
    name: "ashby_application_info",
    description: "Get detailed info about a specific application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
      },
      required: ["applicationId"],
    },
    endpoint: "application.info",
  },
  {
    name: "ashby_application_list",
    description:
      "List applications with optional filtering by job and/or status. Use jobId to get all applications for a specific job without needing to paginate through everything.",
    inputSchema: {
      type: "object",
      properties: {
        jobId: {
          type: "string",
          description:
            "Filter by job UUID — returns only applications for this job",
        },
        status: {
          type: "string",
          enum: ["Active", "Hired", "Archived", "Lead"],
          description: "Filter by application status",
        },
        updatedAfter: {
          type: "string",
          description:
            "ISO 8601 timestamp — only return applications updated after this date",
        },
        limit: { type: "number", description: "Max results per page" },
        cursor: {
          type: "string",
          description:
            "Pagination cursor (pass nextCursor from previous response)",
        },
      },
    },
    endpoint: "application.list",
  },
  {
    name: "ashby_application_update",
    description: "Update an existing application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        sourceId: { type: "string", description: "Updated source UUID" },
        creditedToUserId: {
          type: "string",
          description: "Updated credited user UUID",
        },
      },
      required: ["applicationId"],
    },
    endpoint: "application.update",
  },
  {
    name: "ashby_application_change_stage",
    description:
      "Move an application to a different interview stage.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        interviewStageId: {
          type: "string",
          description: "Target interview stage UUID",
        },
        archiveReasonId: {
          type: "string",
          description:
            "Archive reason UUID (required when moving to an archived stage)",
        },
      },
      required: ["applicationId", "interviewStageId"],
    },
    endpoint: "application.changeStage",
  },
  {
    name: "ashby_application_change_source",
    description: "Change the source of an application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        sourceId: { type: "string", description: "New source UUID" },
      },
      required: ["applicationId", "sourceId"],
    },
    endpoint: "application.changeSource",
  },
  {
    name: "ashby_application_transfer",
    description: "Transfer an application to a different job.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        jobId: { type: "string", description: "Target job UUID" },
        interviewStageId: {
          type: "string",
          description: "Target stage UUID in the new job",
        },
      },
      required: ["applicationId", "jobId"],
    },
    endpoint: "application.transfer",
  },
  {
    name: "ashby_application_hire",
    description: "Hire a candidate through their application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
      },
      required: ["applicationId"],
    },
    endpoint: "application.hire",
  },
  {
    name: "ashby_application_add_hiring_team_member",
    description: "Add a user to an application's hiring team.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        userId: {
          type: "string",
          description: "User UUID to add to the team",
        },
        role: {
          type: "string",
          enum: [
            "Hiring Manager",
            "Recruiter",
            "Coordinator",
            "Sourcer",
          ],
          description: "Team role",
        },
      },
      required: ["applicationId", "userId", "role"],
    },
    endpoint: "application.addHiringTeamMember",
  },
  {
    name: "ashby_application_remove_hiring_team_member",
    description: "Remove a user from an application's hiring team.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        userId: {
          type: "string",
          description: "User UUID to remove",
        },
        role: {
          type: "string",
          description: "Team role to remove",
        },
      },
      required: ["applicationId", "userId", "role"],
    },
    endpoint: "application.removeHiringTeamMember",
  },
  {
    name: "ashby_application_list_criteria_evaluations",
    description:
      "List scorecard / criteria evaluations for an application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
      },
      required: ["applicationId"],
    },
    endpoint: "application.listCriteriaEvaluations",
  },
  {
    name: "ashby_application_list_history",
    description: "List stage-change history for an application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
      },
      required: ["applicationId"],
    },
    endpoint: "application.listHistory",
  },
];

// ─── Job Tools ────────────────────────────────────────────────────────────────

export const jobTools: ToolDefinition[] = [
  {
    name: "ashby_job_create",
    description: "Create a new job posting in Ashby.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Job title" },
        departmentId: { type: "string", description: "Department UUID" },
        locationId: { type: "string", description: "Location UUID" },
        defaultInterviewPlanId: {
          type: "string",
          description: "Default interview plan UUID",
        },
        teamId: { type: "string", description: "Team UUID" },
        employmentType: {
          type: "string",
          enum: [
            "FullTime",
            "PartTime",
            "Intern",
            "Contract",
            "Temporary",
          ],
          description: "Employment type",
        },
      },
      required: ["title"],
    },
    endpoint: "job.create",
  },
  {
    name: "ashby_job_info",
    description: "Get detailed information about a specific job.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Job UUID" },
      },
      required: ["id"],
    },
    endpoint: "job.info",
  },
  {
    name: "ashby_job_list",
    description:
      "List all open, closed, and archived jobs. Include 'Draft' in status to also get draft jobs.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
        status: {
          type: "array",
          items: {
            type: "string",
            enum: ["Open", "Closed", "Archived", "Draft"],
          },
          description: "Filter by job statuses",
        },
      },
    },
    endpoint: "job.list",
  },
  {
    name: "ashby_job_search",
    description: "Search for jobs by title or other criteria.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Job title to search for" },
      },
    },
    endpoint: "job.search",
  },
  {
    name: "ashby_job_update",
    description: "Update a job's details.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Job UUID" },
        title: { type: "string", description: "Updated title" },
        departmentId: {
          type: "string",
          description: "Updated department UUID",
        },
        locationId: {
          type: "string",
          description: "Updated location UUID",
        },
        employmentType: {
          type: "string",
          enum: [
            "FullTime",
            "PartTime",
            "Intern",
            "Contract",
            "Temporary",
          ],
          description: "Updated employment type",
        },
      },
      required: ["id"],
    },
    endpoint: "job.update",
  },
  {
    name: "ashby_job_set_status",
    description:
      "Change a job's status (e.g. open, close, archive, draft).",
    inputSchema: {
      type: "object",
      properties: {
        jobId: { type: "string", description: "Job UUID" },
        status: {
          type: "string",
          enum: ["Open", "Closed", "Archived", "Draft"],
          description: "New status",
        },
      },
      required: ["jobId", "status"],
    },
    endpoint: "job.setStatus",
  },
];

// ─── Job Posting Tools ────────────────────────────────────────────────────────

export const jobPostingTools: ToolDefinition[] = [
  {
    name: "ashby_job_posting_info",
    description: "Get info about a specific job posting.",
    inputSchema: {
      type: "object",
      properties: {
        jobPostingId: { type: "string", description: "Job posting UUID" },
      },
      required: ["jobPostingId"],
    },
    endpoint: "jobPosting.info",
  },
  {
    name: "ashby_job_posting_list",
    description: "List all job postings.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "jobPosting.list",
  },
];

// ─── Offer Tools ──────────────────────────────────────────────────────────────

export const offerTools: ToolDefinition[] = [
  {
    name: "ashby_offer_create",
    description:
      "Create a new offer for an application. Accepts offer form field values.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        offerFormId: {
          type: "string",
          description: "Offer form definition UUID",
        },
        fieldValues: {
          type: "object",
          description:
            "Key-value pairs of offer form field IDs to their values. Types: Boolean, Currency ({currencyCode, value}), Date (ISO string), Number, String, ValueSelect, MultiValueSelect.",
        },
        startDate: {
          type: "string",
          description: "Offer start date (ISO 8601)",
        },
      },
      required: ["applicationId"],
    },
    endpoint: "offer.create",
  },
  {
    name: "ashby_offer_info",
    description: "Get details about a specific offer.",
    inputSchema: {
      type: "object",
      properties: {
        offerId: { type: "string", description: "Offer UUID" },
      },
      required: ["offerId"],
    },
    endpoint: "offer.info",
  },
  {
    name: "ashby_offer_list",
    description: "List all offers with optional pagination.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "offer.list",
  },
  {
    name: "ashby_offer_update",
    description: "Update an existing offer.",
    inputSchema: {
      type: "object",
      properties: {
        offerId: { type: "string", description: "Offer UUID" },
        fieldValues: {
          type: "object",
          description: "Updated offer field values",
        },
      },
      required: ["offerId"],
    },
    endpoint: "offer.update",
  },
  {
    name: "ashby_offer_start_approval_process",
    description: "Start the approval process for an offer.",
    inputSchema: {
      type: "object",
      properties: {
        offerId: { type: "string", description: "Offer UUID" },
      },
      required: ["offerId"],
    },
    endpoint: "offer.startApprovalProcess",
  },
];

// ─── Interview Schedule Tools ─────────────────────────────────────────────────

export const interviewScheduleTools: ToolDefinition[] = [
  {
    name: "ashby_interview_schedule_create",
    description: "Create a scheduled interview in Ashby.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Application UUID" },
        interviewStageId: {
          type: "string",
          description: "Interview stage UUID",
        },
        interviewEvents: {
          type: "array",
          description:
            "Array of interview event objects with startTime, endTime, interviewerUserIds",
          items: {
            type: "object",
            properties: {
              interviewId: {
                type: "string",
                description: "Interview definition UUID",
              },
              startTime: {
                type: "string",
                description: "ISO 8601 start time",
              },
              endTime: {
                type: "string",
                description: "ISO 8601 end time",
              },
              interviewerUserIds: {
                type: "array",
                items: { type: "string" },
                description: "User UUIDs of interviewers",
              },
            },
          },
        },
      },
      required: ["applicationId", "interviewStageId", "interviewEvents"],
    },
    endpoint: "interviewSchedule.create",
  },
  {
    name: "ashby_interview_schedule_list",
    description: "List scheduled interviews. Use applicationId to get all interviews for a specific candidate application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: { type: "string", description: "Filter by application UUID — returns only interviews for this application" },
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "interviewSchedule.list",
  },
  {
    name: "ashby_interview_schedule_update",
    description: "Update a scheduled interview.",
    inputSchema: {
      type: "object",
      properties: {
        interviewScheduleId: {
          type: "string",
          description: "Interview schedule UUID",
        },
        interviewEvents: {
          type: "array",
          description: "Updated interview events",
          items: { type: "object" },
        },
      },
      required: ["interviewScheduleId"],
    },
    endpoint: "interviewSchedule.update",
  },
  {
    name: "ashby_interview_schedule_cancel",
    description: "Cancel a scheduled interview.",
    inputSchema: {
      type: "object",
      properties: {
        interviewScheduleId: {
          type: "string",
          description: "Interview schedule UUID",
        },
      },
      required: ["interviewScheduleId"],
    },
    endpoint: "interviewSchedule.cancel",
  },
];

// ─── Interview Stage & Plan Tools ─────────────────────────────────────────────

export const interviewPlanTools: ToolDefinition[] = [
  {
    name: "ashby_interview_stage_list",
    description:
      "List all interview stages, optionally filtered by interview plan.",
    inputSchema: {
      type: "object",
      properties: {
        interviewPlanId: {
          type: "string",
          description: "Filter by interview plan UUID",
        },
      },
    },
    endpoint: "interviewStage.list",
  },
  {
    name: "ashby_interview_plan_list",
    description: "List all interview plans.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "interviewPlan.list",
  },
];

// ─── Organization Tools (Departments, Locations, Users, Sources, Tags) ──────

export const organizationTools: ToolDefinition[] = [
  {
    name: "ashby_department_list",
    description: "List all departments in the organization.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "department.list",
  },
  {
    name: "ashby_department_info",
    description: "Get info about a specific department.",
    inputSchema: {
      type: "object",
      properties: {
        departmentId: { type: "string", description: "Department UUID" },
      },
      required: ["departmentId"],
    },
    endpoint: "department.info",
  },
  {
    name: "ashby_department_create",
    description: "Create a new department.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Department name" },
        parentId: {
          type: "string",
          description: "Parent department UUID (for nested departments)",
        },
      },
      required: ["name"],
    },
    endpoint: "department.create",
  },
  {
    name: "ashby_location_list",
    description: "List all locations in the organization.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "location.list",
  },
  {
    name: "ashby_location_info",
    description: "Get info about a specific location.",
    inputSchema: {
      type: "object",
      properties: {
        locationId: { type: "string", description: "Location UUID" },
      },
      required: ["locationId"],
    },
    endpoint: "location.info",
  },
  {
    name: "ashby_location_create",
    description: "Create a new location.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Location name" },
        isRemote: {
          type: "boolean",
          description: "Whether this is a remote location",
        },
        address: {
          type: "object",
          properties: {
            addressLine1: { type: "string" },
            addressLine2: { type: "string" },
            city: { type: "string" },
            region: { type: "string" },
            postalCode: { type: "string" },
            country: { type: "string" },
          },
          description: "Physical address (if not remote)",
        },
      },
      required: ["name"],
    },
    endpoint: "location.create",
  },
  {
    name: "ashby_location_archive",
    description: "Archive a location.",
    inputSchema: {
      type: "object",
      properties: {
        locationId: { type: "string", description: "Location UUID" },
      },
      required: ["locationId"],
    },
    endpoint: "location.archive",
  },
  {
    name: "ashby_location_restore",
    description: "Restore an archived location.",
    inputSchema: {
      type: "object",
      properties: {
        locationId: { type: "string", description: "Location UUID" },
      },
      required: ["locationId"],
    },
    endpoint: "location.restore",
  },
  {
    name: "ashby_user_list",
    description: "List all users (team members) in Ashby.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "user.list",
  },
  {
    name: "ashby_user_info",
    description: "Get info about a specific user by ID.",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User UUID" },
      },
      required: ["userId"],
    },
    endpoint: "user.info",
  },
  {
    name: "ashby_user_search",
    description: "Search for users by name or email.",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "Email to search for" },
        name: { type: "string", description: "Name to search for" },
      },
    },
    endpoint: "user.search",
  },
  {
    name: "ashby_source_list",
    description: "List all candidate sources (e.g. job boards, referrals).",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "source.list",
  },
  {
    name: "ashby_candidate_tag_list",
    description: "List all available candidate tags.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "candidateTag.list",
  },
  {
    name: "ashby_archive_reason_list",
    description: "List all archive/rejection reasons.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "archiveReason.list",
  },
];

// ─── Opening Tools ────────────────────────────────────────────────────────────

export const openingTools: ToolDefinition[] = [
  {
    name: "ashby_opening_list",
    description: "List all openings across jobs.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "opening.list",
  },
  {
    name: "ashby_opening_info",
    description: "Get details about a specific opening.",
    inputSchema: {
      type: "object",
      properties: {
        openingId: { type: "string", description: "Opening UUID" },
      },
      required: ["openingId"],
    },
    endpoint: "opening.info",
  },
  {
    name: "ashby_opening_create",
    description: "Create a new opening for a job.",
    inputSchema: {
      type: "object",
      properties: {
        jobId: { type: "string", description: "Job UUID" },
        locationId: { type: "string", description: "Location UUID" },
        targetHireDate: {
          type: "string",
          description: "Target hire date (ISO 8601)",
        },
        targetStartDate: {
          type: "string",
          description: "Target start date (ISO 8601)",
        },
      },
      required: ["jobId"],
    },
    endpoint: "opening.create",
  },
];

// ─── Project Tools ────────────────────────────────────────────────────────────

export const projectTools: ToolDefinition[] = [
  {
    name: "ashby_project_list",
    description: "List all sourcing/talent projects.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "project.list",
  },
  {
    name: "ashby_project_info",
    description: "Get info about a specific project.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: { type: "string", description: "Project UUID" },
      },
      required: ["projectId"],
    },
    endpoint: "project.info",
  },
  {
    name: "ashby_project_create",
    description: "Create a new sourcing project.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Project title" },
      },
      required: ["title"],
    },
    endpoint: "project.create",
  },
];

// ─── Custom Fields Tools ──────────────────────────────────────────────────────

export const customFieldTools: ToolDefinition[] = [
  {
    name: "ashby_custom_field_list",
    description:
      "List all custom field definitions for a given object type (candidate, application, job, etc.).",
    inputSchema: {
      type: "object",
      properties: {
        objectType: {
          type: "string",
          enum: [
            "Candidate",
            "Application",
            "Job",
            "Opening",
            "Offer",
          ],
          description: "Object type to list custom fields for",
        },
      },
      required: ["objectType"],
    },
    endpoint: "customField.list",
  },
  {
    name: "ashby_custom_field_set_value",
    description:
      "Set a custom field value on a candidate, application, or other entity.",
    inputSchema: {
      type: "object",
      properties: {
        objectId: {
          type: "string",
          description: "UUID of the entity (candidate, application, etc.)",
        },
        fieldId: { type: "string", description: "Custom field UUID" },
        value: {
          description:
            "Value to set — type depends on the field (string, number, boolean, array, object)",
        },
      },
      required: ["objectId", "fieldId", "value"],
    },
    endpoint: "customField.setValue",
  },
];

// ─── Webhook Tools ────────────────────────────────────────────────────────────

export const webhookTools: ToolDefinition[] = [
  {
    name: "ashby_webhook_create",
    description:
      "Create a webhook subscription. Events: applicationSubmit, applicationUpdate, candidateHire, candidateStageChange, candidateDelete, candidateMerge, interviewPlanTransition, interviewScheduleCreate, interviewScheduleUpdate, jobCreate, jobUpdate, jobPostingUpdate, jobPostingPublish, jobPostingUnpublish, offerCreate, offerDelete, offerUpdate, openingCreate, pushToHRIS, surveySubmit, signatureRequestUpdate.",
    inputSchema: {
      type: "object",
      properties: {
        webhookUrl: {
          type: "string",
          description: "URL to receive webhook POSTs",
        },
        secretToken: {
          type: "string",
          description: "Shared secret for verifying webhook signatures",
        },
        requestTypes: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "applicationSubmit",
              "applicationUpdate",
              "candidateHire",
              "candidateStageChange",
              "candidateDelete",
              "candidateMerge",
              "interviewPlanTransition",
              "interviewScheduleCreate",
              "interviewScheduleUpdate",
              "jobCreate",
              "jobUpdate",
              "jobPostingUpdate",
              "jobPostingPublish",
              "jobPostingUnpublish",
              "offerCreate",
              "offerDelete",
              "offerUpdate",
              "openingCreate",
              "pushToHRIS",
              "surveySubmit",
              "signatureRequestUpdate",
            ],
          },
          description: "List of event types to subscribe to",
        },
      },
      required: ["webhookUrl", "requestTypes"],
    },
    endpoint: "webhook.create",
  },
  {
    name: "ashby_webhook_list",
    description: "List all registered webhooks.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    endpoint: "webhook.list",
  },
  {
    name: "ashby_webhook_update",
    description: "Update an existing webhook.",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook UUID" },
        webhookUrl: {
          type: "string",
          description: "Updated callback URL",
        },
        enabled: { type: "boolean", description: "Enable or disable" },
        requestTypes: {
          type: "array",
          items: { type: "string" },
          description: "Updated event types",
        },
      },
      required: ["webhookId"],
    },
    endpoint: "webhook.update",
  },
  {
    name: "ashby_webhook_delete",
    description: "Delete a webhook.",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook UUID" },
      },
      required: ["webhookId"],
    },
    endpoint: "webhook.delete",
  },
];

// ─── Feedback / Scorecard Tools ───────────────────────────────────────────────

export const feedbackTools: ToolDefinition[] = [
  {
    name: "ashby_feedback_form_definition_list",
    description: "List all feedback/scorecard form definitions.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "feedbackFormDefinition.list",
  },
  {
    name: "ashby_feedback_form_submit",
    description: "Submit a completed feedback/scorecard form.",
    inputSchema: {
      type: "object",
      properties: {
        interviewEventId: {
          type: "string",
          description: "Interview event UUID",
        },
        feedbackFormDefinitionId: {
          type: "string",
          description: "Form definition UUID",
        },
        submitterUserId: {
          type: "string",
          description: "User UUID submitting the feedback",
        },
        fieldValues: {
          type: "object",
          description: "Field ID to value mappings",
        },
      },
      required: [
        "interviewEventId",
        "feedbackFormDefinitionId",
        "submitterUserId",
        "fieldValues",
      ],
    },
    endpoint: "feedbackFormSubmission.submit",
  },
];

// ─── Assessment & Survey Tools ────────────────────────────────────────────────

export const assessmentTools: ToolDefinition[] = [
  {
    name: "ashby_assessment_list",
    description: "List assessment integrations.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    endpoint: "assessment.list",
  },
];

// ─── Offer Form Tools ────────────────────────────────────────────────────────

export const offerFormTools: ToolDefinition[] = [
  {
    name: "ashby_offer_form_definition_list",
    description: "List all offer form definitions.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "offerFormDefinition.list",
  },
];

// ─── Approval & Hiring Team Tools ─────────────────────────────────────────────

export const approvalTools: ToolDefinition[] = [
  {
    name: "ashby_approval_definition_list",
    description: "List all approval workflow definitions.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "approvalDefinition.list",
  },
  {
    name: "ashby_hiring_team_role_list",
    description: "List all available hiring team roles.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    endpoint: "hiringTeamRole.list",
  },
];

// ─── All Tools Combined ───────────────────────────────────────────────────────

// ─── Application Feedback Tools ──────────────────────────────────────────────

export const applicationFeedbackTools: ToolDefinition[] = [
  {
    name: "ashby_application_feedback_list",
    description:
      "List submitted feedback/scorecards. Returns full scorecard data including ratings, notes, and interviewer. Filter by applicationId to get feedback for a specific candidate application, or omit to list all feedback across the organization.",
    inputSchema: {
      type: "object",
      properties: {
        applicationId: {
          type: "string",
          description: "Application UUID — filter feedback for this application",
        },
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "applicationFeedback.list",
  },
];

// ─── Communication Template Tools ────────────────────────────────────────────

export const communicationTemplateTools: ToolDefinition[] = [
  {
    name: "ashby_communication_template_list",
    description:
      "List all communication/email templates configured in Ashby. Returns template titles, intended types (email, etc.), and timestamps.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "communicationTemplate.list",
  },
];

// ─── Interview Definition Tools ──────────────────────────────────────────────

export const interviewTools: ToolDefinition[] = [
  {
    name: "ashby_interview_list",
    description:
      "List interview definitions (interview types/rounds configured in interview plans). Returns interview title, whether it's a debrief, associated feedback form, and instructions.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results per page" },
        cursor: { type: "string", description: "Pagination cursor (pass nextCursor from previous response)" },
      },
    },
    endpoint: "interview.list",
  },
];

// ─── All Tools Combined ───────────────────────────────────────────────────────

export const allTools: ToolDefinition[] = [
  ...candidateTools,
  ...applicationTools,
  ...jobTools,
  ...jobPostingTools,
  ...offerTools,
  ...interviewScheduleTools,
  ...interviewPlanTools,
  ...organizationTools,
  ...openingTools,
  ...projectTools,
  ...customFieldTools,
  ...webhookTools,
  ...feedbackTools,
  ...assessmentTools,
  ...offerFormTools,
  ...approvalTools,
  ...applicationFeedbackTools,
  ...communicationTemplateTools,
  ...interviewTools,
];
