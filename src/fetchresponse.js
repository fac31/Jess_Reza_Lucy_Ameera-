import getConfig from './getConfig.js';

export async function fetchResponse(userRequest, conversationOutput, messages) {
  const url = "https://api.openai.com/v1/chat/completions";
  const config = await getConfig();
  const key = config?.OPEN_AI_KEY;

  const requestController = new AbortController();
  const signal = requestController.signal;

  const prompt = {
    role: "user",
    content: userRequest.value,
  };

  messages.push(prompt);
  updateMessages(messages, conversationOutput);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        stream: false,
      }),
    });
    const data = await response.json();

    const answer = data.choices[0].message.content;

    messages.push({
      role: "assistant",
      content: answer,
    });

    updateMessages(messages, conversationOutput);
  } catch (error) {
    console.log(error);
  }
}