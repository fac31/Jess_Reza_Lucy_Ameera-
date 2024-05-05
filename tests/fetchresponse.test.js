import { fetchResponse } from '../src/fetchresponse';
import { test, equal, notEqual } from './test-helpers';

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve({
    choices: [{ message: { content: "Test response" } }]
  })
});

const getConfig = () => Promise.resolve({ OPEN_AI_KEY: "fake-key" });
const updateMessages = (messages, conversationOutput) => {};

function testFetchResponse() {
  const messages = [];
  const conversationOutput = {};  
  const userRequest = { value: "Hello" };

  test("Test fetchResponse function", async () => {
    await fetchResponse(userRequest, conversationOutput, messages);
    equal(messages.length, 2, "Should add two messages to the array");
    equal(messages[1].content, "Test response", "The response content should be correctly added to messages");
  });
}

testFetchResponse();