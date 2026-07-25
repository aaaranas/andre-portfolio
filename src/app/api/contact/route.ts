import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["andremilanaranas@gmail.com"],
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
      if (error) {
        return Response.json({ error: "Failed to send. Try emailing directly." }, { status: 500 });
      }
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Server error. Try emailing directly." }, { status: 500 });
  }
}
