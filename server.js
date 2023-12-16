const express = require('express');
const cors = require('cors');

const db = require("./models");

const app = express();

require("dotenv").config({ path: "./.env" });


// middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const memeberRoute = require("./routers/memberRouter");

app.use('/api/member', memeberRoute);


const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });