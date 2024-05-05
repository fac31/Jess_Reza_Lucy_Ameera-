import { clearMessages } from '../src/clearmessages';
import { test, equal } from './test-helpers';

function testClearMessages() {
  const mockElement = document.createElement("div");
  mockElement.innerHTML = "This is some content";

  test("clearMessages should clear the innerHTML of the given element", () => {
    clearMessages(mockElement);  
    equal(mockElement.innerHTML, "", "innerHTML should be empty after calling clearMessages");
  });
}

testClearMessages();