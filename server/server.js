const express = require("express");
require("dotenv").config();
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// parse data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/info", (req, res) => {
  console.log("🎉");
  res.status(200).json({ info: "preformatte text 🎉" });
});

app.post("/info", (req, res) => {
  console.log(req.body);
  res.status(200).json({ info: "preformatte text 🎉" });
});

// get inout from client side from the user
// app.get('/api', (req, res) => {
//     console.log(req.body);
//     const userRequest = req.body.userRequest;
//     res.json({
//         status: 'success',
//         data: req.body
//     });
// });
// Route to handle incoming requests from frontend
// app.get('/ask-gpt', async (req, res) => {
//   try {
//     const userRequest = req.body.userRequest;
//     const apiKey = process.env.OPEN_AI_KEY; // Replace this with your OpenAI API key

//     // Make a request to OpenAI Chat Completion API
//     const response = await axios.get('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content:'this is a test' }, // Initial prompt
//         { role: 'user', content: userRequest } // User's input
//       ],
//       max_tokens: 10 // Adjust token limit based on your requirements
//     }, {
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const result = response.data.choices[0].message.content;

//     // Send the result back to the frontend
//     res.json({ result });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

//  satic files being passed on
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
