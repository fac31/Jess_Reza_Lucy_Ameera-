const express = require("express");
require("dotenv").config();
const axios = require("axios");
const OpenAI = require('openai');

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
  res.status(200).json({ info: "preformatte text " });
});

//  set up get and post routes to get user input and reponsd with the output once fetched from the api.


// get inout from client side from the user

// Route to handle incoming requests from frontend
app.get('/ask-gpt', async (req, res) => {
  try {
    const userRequest = req.body;
    console
    
    const apiKey = process.env.OPEN_AI_KEY; 
    const openai = new OpenAI({ apiKey: apiKey });

    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "this is a test"},
          {"role": "user", "content": userRequest}],
      model: "gpt-3.5-turbo",
    });
    
  

    const result = completion.data;
    console.log(result);

    // Send the result back to the frontend
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  satic files being passed on
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
