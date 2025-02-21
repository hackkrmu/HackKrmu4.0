import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log({prompt})
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
console.log({responseText})
    return Response.json({ text: responseText });
  } catch (error) {
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
