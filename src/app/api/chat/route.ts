import { GoogleGenAI } from "@google/genai";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Andre M. Aranas, a full-stack developer, data analyst,
and AI automation engineer. Answer concisely and professionally about Andre's
experience, projects, skills, education, and availability using the portfolio data.
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
          "Andre specializes in full-stack development, data analytics, and AI automation. Please use the contact form for more information.",
      });
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [
      { role: "user", parts: [{ text: `System Context:\n${PORTFOLIO_CONTEXT}` }] },
      { role: "model", parts: [{ text: "Understood. I am ready to help." }] },
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
