// pass the inout from form in html to the server
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-container");
  const userInput = document.getElementById("user-request");
  const output = document.querySelector(".conversation-output");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userRequest = userInput.value;

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userRequest }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const result = data.result;

      // Update the conversation output with the result
      output.innerHTML += `<p>User: ${userRequest}</p>`;
      output.innerHTML += `<p>GPT-3: ${result}</p>`;

      // Clear the input field
      userInput.value = "";
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
