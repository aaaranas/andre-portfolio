import { GoogleGenAI } from "@google/genai";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Andre Milan A. Arañas, a full-stack web developer, data analyst,
and AI automation engineer from Cebu, Philippines. Answer concisely and professionally about Andre's
experience, projects, skills, education, and availability. He is a 4th-year BS Computer Science
student at UP Cebu, currently interning at eComia as a Web Developer Intern (Project Manager &
Frontend Developer). His key projects include Komyut ta Bai (Cebu transit planner), Donezo
(offline-first Kanban), and IrregSkolar (UP schedule planner). He is frontend-leaning and full-stack
capable, specializing in React, Next.js, TypeScript, and Node.js.
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
