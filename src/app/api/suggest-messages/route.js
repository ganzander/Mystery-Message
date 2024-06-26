import OpenAI from "openai";

export async function GET(req) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const messagePrompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    const response = await openai.createCompletion({
      engine: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      prompt: messagePrompt,
    });

    return Response.json({ data: "hello" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ data: error }, { status: 400 });
  }
}
