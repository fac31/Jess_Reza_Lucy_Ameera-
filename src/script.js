import { fetchResponse } from './fetchresponse.js';
import { updateMessages } from './updatemessages.js';
import { clearMessages } from './clearmessages.js';

const conversationOutput = document.querySelector(".conversation-output");
const userRequest = document.querySelector("#user-request");
const formContainer = document.querySelector(".form-container");

const messages = [];

function submitForm(e) {
    e.preventDefault();
    fetchResponse(userRequest, conversationOutput, messages)
        .catch(error => console.error('Error handling response:', error));
}

formContainer.addEventListener("submit", submitForm);
