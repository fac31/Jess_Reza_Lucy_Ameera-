const conversationOutput = document.querySelector(".conversation-output");
const userRequest = document.querySelector("#user-request");
const formContainer = document.querySelector(".form-container");
import getConfig from "./getConfig.js";

const messages = [];
let signal;
let requestController;

async function fetchResponse(userRequest) {
  const url = "https://api.openai.com/v1/chat/completions";
  const config = await getConfig();
  const key = config?.OPEN_AI_KEY;

  requestController = new AbortController();
  signal = requestController.signal;

  const prompt = {
    role: "user",
    content: userRequest.value,
  };

  messages.push(prompt);
  updateMessages(messages);

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

    updateMessages(messages);
  } catch (error) {
    console.log(error);
  }
}

function updateMessages(messages) {
  clearMessages(conversationOutput);
  messages.forEach((msg) => {
    const sender = msg.role === "user" ? "User" : "ChatGPT";
    const msgDiv = document.createElement("div");
    const msgOwner = document.createElement("h6");
    const msgText = document.createElement("p");
    msgDiv.classList.add("msg-container");
    if (msg.role === "assistant") msgDiv.classList.add("gpt-msg");
    msgOwner.classList.add("msg-header");
    if (msg.role === "assistant") msgOwner.classList.add("gpt-header");
    msgText.classList.add("msg-text");
    msgOwner.textContent = sender;
    msgText.textContent = msg.content;
    msgDiv.appendChild(msgOwner);
    msgDiv.appendChild(msgText);
    conversationOutput.appendChild(msgDiv);
  });
  conversationOutput.scrollTop = conversationOutput.scrollHeight;
  userRequest.value = "";
}

export function clearMessages(conversationOutput) {
  conversationOutput.innerHTML = "";
}

function submitForm(e) {
  e.preventDefault();

  // const apiKey = apikey.value;
  // localStorage.setItem("apikey", apiKey);

  // apiContainer.classList.add("hidden")

  fetchResponse(userRequest);
}

formContainer.addEventListener("submit", submitForm);
