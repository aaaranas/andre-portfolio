export const automationProjects = [
  {
    id: "n8n-ai-triage-agent",
    name: "Support Inbox Triage Agent",
    tagline: "Reads an incoming message, works out how urgent it is, then acts on it",
    courseNote: "AI Engineer Course Project — n8n & LLM Orchestration",
    description:
      "Support mail lands on a webhook and the workflow decides what to do with it. A Gemini agent reads the message for intent and urgency; if it cites an order number, the agent runs a Postgres query tool and looks it up before replying. Anything scoring above seven goes to the on-call Slack channel with a summary attached. Everything else gets a drafted reply out through Resend.",
    n8nNodes: [
      { name: "Webhook Listener", type: "Trigger" },
      { name: "Gemini 1.5 Agent", type: "AI Engine" },
      { name: "PostgreSQL Tool", type: "Database Query" },
      { name: "Slack Notification", type: "Alerting" },
      { name: "Resend Email Node", type: "Communication" },
    ],
    workflowSteps: [
      "1. Webhook receives payload from frontend / contact form",
      "2. AI Agent analyzes sentiment, urgency (1-10), and missing details",
      "3. Agent dynamically executes PostgreSQL query tool if order ID is mentioned",
      "4. Routes high urgency (>7) to #urgent-support Slack channel with summary",
      "5. Generates personalized reply draft and dispatches via Resend API",
    ],
    sampleExecution: {
      inputName: "Maria Santos",
      inputEmail: "maria.santos@example.com",
      inputMessage: "Hi, my QR ticket for the Cebu tech summit tonight won't download. Order #9482. Is there another way to get it?",
      outputUrgency: "9 / 10 (Critical)",
      outputSentiment: "Negative / Anxious",
      outputActions: [
        "Tool Executed: Searched Postgres table `tickets` for Order #9482 -> Status: CONFIRMED",
        "Slack Alert Fired: Sent notification to #event-desk with direct re-send link",
        "Resend API: Email sent with fresh QR ticket PDF attachment",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
  {
    id: "n8n-github-ai-summarizer",
    name: "Pull Request Review Bot",
    tagline: "Takes a first pass at the diff before a human opens the pull request",
    courseNote: "AI Engineer Course Project — Autonomous Developer Tooling",
    description:
      "A GitHub webhook fires when a pull request opens. The workflow pulls the file diffs, checks them against the repo's style guide, and hands them to Gemini for a read on risk and clarity. It posts one structured Markdown review back on the PR thread — the obvious things caught before a reviewer spends attention on them.",
    n8nNodes: [
      { name: "GitHub Webhook", type: "Trigger" },
      { name: "Code Diff Extractor", type: "Data Transform" },
      { name: "Gemini Code Reviewer", type: "AI Node" },
      { name: "GitHub PR Commenter", type: "API Node" },
    ],
    workflowSteps: [
      "1. GitHub Webhook triggers on PR opened or commit pushed",
      "2. Extracts file diffs and compares against repository style guidelines",
      "3. Gemini AI node analyzes risk, security considerations, and code clarity",
      "4. Posts a structured Markdown code review comment directly on the GitHub PR thread",
    ],
    sampleExecution: {
      inputName: "PR #14 - Add WebSocket Sync Engine",
      inputEmail: "aaaranas@up.edu.ph",
      inputMessage: "Added Socket.io server logic and offline reconnection handlers.",
      outputUrgency: "3 / 10 (Feature PR)",
      outputSentiment: "Neutral / Technical",
      outputActions: [
        "Diff Inspected: 4 files changed (+180 lines, -24 lines)",
        "AI Security Audit: Passed - No exposed tokens detected",
        "Posted PR Review Comment on GitHub with summary breakdown",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
];
