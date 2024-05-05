export function updateMessages(messages, conversationOutput) {
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
  }