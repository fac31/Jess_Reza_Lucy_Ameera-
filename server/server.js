const express = require('express');
dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello Jess Lucy and razzle dazzle !')
    
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

