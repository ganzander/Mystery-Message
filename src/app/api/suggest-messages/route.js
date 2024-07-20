const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

export async function GET(req) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const messagePrompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure every time questions are unique and random";

  try {
    const result = await model.generateContent(messagePrompt);
    const chatResult = result.response.text();
    const quesArr = chatResult.split("||");
    console.log(quesArr);
    return Response.json({ Success: true, data: quesArr }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { Success: true, data: error.message },
      { status: 400 }
    );
  }
}
