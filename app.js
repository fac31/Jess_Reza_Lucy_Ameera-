const sendButton = document.querySelector("#send-button");
const conversationOutput = document.querySelector(".conversation-output");
const userRequest = document.querySelector("#user-request");
const apikey = document.querySelector("#apikey");
const formContainer = document.querySelector(".form-container");
const apiContainer = document.querySelector(".api-container");

const messages = [];
let signal;
let requestController;

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey.value}`,
  },
  body: JSON.stringify(userRequest.value),
};

async function fetchResponse(userRequest) {
  const url="https://api.openai.com/v1/chat/completions";

  requestController = new AbortController();
  signal = requestController.signal;

  const prompt = {
    role: 'user',
    content: userRequest.value,
  };

  messages.push(prompt);
  updateMessages(messages);

  try {
    console.log(apikey.value);
    const response = await fetch(url, {
      method: 'POST',
      signal: signal,
      headers: {
        Authorization: `Bearer ${apikey.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: false,
      }),
    });
    const data = await response.json();

    const answer = data.choices[0].message.content;

    messages.push({
      role: 'assistant',
      content: answer,
    });

    updateMessages(messages);

  } catch(error) {
    console.log(error);
  }
}

function updateMessages(messages) {
  clearMessages();
  console.log(messages);
  messages.forEach(msg => {
    console.log(msg.content);
    const msgDiv = document.createElement("div");
    const msgOwner = document.createElement("h6");
    const msgText = document.createElement("p");
    msgOwner.textContent = msg.role;
    msgText.textContent = msg.content;
    msgDiv.appendChild(msgOwner);
    msgDiv.appendChild(msgText);
    conversationOutput.appendChild(msgDiv);
  })
}

function clearMessages() {
  conversationOutput.innerHTML = "";
}

function submitForm(e) {
  e.preventDefault();

  const apiKey = apikey.value;
  localStorage.setItem("apikey", apiKey);

  apiContainer.classList.add("hidden")

  fetchResponse(userRequest);
}

formContainer.addEventListener("submit", submitForm)
