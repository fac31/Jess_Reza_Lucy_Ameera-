import { updateMessages } from '../src/updatemessages';
import { test, equal } from './test-helpers';

function clearMessages(conversationOutput) {
  conversationOutput.innerHTML = "";
}

function testUpdateMessages() {
  const mockConversationOutput = document.createElement("div");
  const messages = [
    { role: "user", content: "Hello, world!" },
    { role: "assistant", content: "Hi, how can I help?" }
  ];

  test("updateMessages should add messages to the conversation output", () => {
    updateMessages(messages, mockConversationOutput);
    equal(mockConversationOutput.children.length, 2, "Should add two message divs to the conversation output");
    equal(mockConversationOutput.children[0].textContent, "UserHello, world!", "First message should be from user with correct content");
    equal(mockConversationOutput.children[1].textContent, "ChatGPTHi, how can I help?", "Second message should be from ChatGPT with correct content");
  });
}

testUpdateMessages();