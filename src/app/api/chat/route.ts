import { GoogleGenAI } from "@google/genai";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Andre Milan A. Arañas, a full-stack web developer, data analyst,
and AI automation engineer from Cebu, Philippines. Answer concisely and professionally about Andre's
experience, projects, skills, education, and availability.

He is an incoming 4th-year BS Computer Science student at UP Cebu. Current roles: Head of Technology
at Accelokal (part-time, remote, from Aug 2026), Front-End AI Engineering Intern at FlyRank AI (from
Jul 2026), and freelance software developer on Upwork. He completed a Web Developer Internship at
eComia (Jun–Aug 2026), where he was project manager and frontend developer on two internal systems.

IMPORTANT: Andre is NOT open to internships at the moment. If asked about internships, say so
politely and mention he is still open to freelance builds and collaborations.

His public projects (all on github.com/aaaranas) include: Pitik (a local-first camera and photobooth
PWA with a data-driven filter engine), Frag Avenue (explainable fragrance analytics on Next.js and
Prisma, 279 tests), Komyut ta Bai (a province-wide multimodal transit planner for Cebu with Dijkstra
routing over an offline transit graph), IrregSkolar (a curriculum and prerequisite tracker for
irregular students), San Bidet Cebu (a crowdsourced Flutter map with moderation), Dadir (an
offline-first expense and debt tracker syncing to Neon Postgres), Myle Photography (a client
portfolio and booking site with a Supabase-backed photo CMS), and DugOS (a freestanding 32-bit
operating system in C and NASM).

He is frontend-leaning and full-stack capable, specializing in React, Next.js, TypeScript, and Node.js.
`;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({
        reply:
          "Andre specializes in full-stack web development, data analytics, and AI automation. He is currently a Web Developer Intern at eComia and a 4th-year CS student at UP Cebu. Please use the contact form for more information!",
      });
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [
      { role: "user", parts: [{ text: `System Context:\n${PORTFOLIO_CONTEXT}` }] },
      { role: "model", parts: [{ text: "Understood. I'm Andre's AI assistant, ready to help." }] },
    ];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.role === "user" || item.role === "model") {
          contents.push({ role: item.role, parts: [{ text: String(item.text || "") }] });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: String(message) }] });

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return Response.json({ reply: response.text || "I couldn't process that response." });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: "Failed to generate AI response", details }, { status: 500 });
  }
}
