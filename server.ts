import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// System prompt context for the AI Assistant
const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Andre M. Aranas, a Senior Full-Stack & AI Systems Engineer.
Here is Andre's background info:
- Role: Senior Full-Stack & AI Systems Engineer with 6+ years of experience building web applications, scalable APIs, and LLM-driven microservices.
- Key Skills: React, TypeScript, Next.js, Node.js, Express, Python, FastAPI, Tailwind CSS, PostgreSQL, Firestore, Redis, Gemini API, PyTorch/Transformers, Docker, Cloud Run, CI/CD.
- Top Projects:
  1. "Synthetix AI Studio": Multi-modal LLM workflow engine for automated content generation and agent orchestration (React, Node.js, Gemini API, WebSockets).
  2. "Nexus Metrics Engine": Real-time high-frequency analytics dashboard processing 100k+ events/sec (TypeScript, Express, Redis, ClickHouse, Recharts).
  3. "FlowState Code Canvas": Collaborative visual IDE with real-time multiplayer editing and AI pair-programming assistant (React, Monaco Editor, WebRTC).
  4. "Aura Commerce Platform": Headless e-commerce architecture with edge AI search recommendations (+38% conversion uplift).
- Experience:
  - Lead Staff Engineer at Nova Tech Labs (2023 - Present): Spearheaded core AI platform architecture, managed team of 8 engineers, reduced API latencies by 42%.
  - Senior Full-Stack Developer at CyberPulse (2021 - 2023): Built real-time streaming pipelines, scaled cloud microservices to 2M monthly active users.
  - Software Engineer at Vertex Systems (2018 - 2021): Developed responsive frontend components, state management engines, and REST/GraphQL APIs.
- Education: B.S. in Computer Science & Artificial Intelligence.
- Availability: Open to full-time leadership roles, high-impact contract consulting, and technical advisor opportunities.
- Contact: andremilanaranas@gmail.com | GitHub: github.com/andre-aranas | LinkedIn: linkedin.com/in/andre-aranas

Instructions:
Answer questions concisely, professionally, and enthusiastically about Andre's experience, technical depth, project architecture, and availability. Keep responses structured, helpful, and friendly.
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }
    
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["andremilanaranas@gmail.com"],
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
      if (error) {
        console.error("Resend error:", error);
        res.status(500).json({ error: "Failed to send. Try emailing directly." });
        return;
      }
    } else {
      console.log("Contact form message received (RESEND_API_KEY not configured):", { name, email, message });
    }

    res.json({ ok: true });
  } catch (err: any) {
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Try emailing directly." });
  }
});

// AI Portfolio Assistant endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response when GEMINI_API_KEY is not configured
      res.json({
        reply: `Thanks for asking! As Andre's portfolio assistant: Andre is a Senior Full-Stack & AI Engineer specializing in React, TypeScript, Node.js, and Gemini AI integration. Feel free to contact him directly at andremilanaranas@gmail.com! (Note: Connect GEMINI_API_KEY in environment for full generative response capabilities).`,
      });
      return;
    }

    // Build chat conversation context
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [
      {
        role: "user",
        parts: [
          {
            text: `System Context:\n${PORTFOLIO_CONTEXT}\n\nPlease answer the visitor's query based on this context.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood! I am ready to answer any questions about Andre's background, projects, skills, and availability.",
          },
        ],
      },
    ];

    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" || msg.role === "model") {
          contents.push({
            role: msg.role,
            parts: [{ text: String(msg.text || "") }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: String(message) }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const replyText = response.text || "I'm sorry, I couldn't process that response.";
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Error in AI chat route:", err);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: err.message || "Unknown error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
