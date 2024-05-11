import { clearMessages } from "./app.js";

test("conversation output section should be empty after clearMessages called", () => {
  const testConversationOutput = {
    innerHTML: "<div>Test Content</div>",
  };
  clearMessages(testConversationOutput);

  equal(
    testConversationOutput.innerHTML,
    "",
    "Conversation output should be empty"
  );
});
