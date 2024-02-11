const express = require('express');
const cors = require('cors');

const app = express();

require("dotenv").config({ path: "./.env" });


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memeberRoute = require("./routers/memberRouter");
const timeRoute = require("./routers/timeRouter");
const visitorRoute = require("./routers/visitorRouter");
const adminRoute = require( "./routers/adminRouter") ; 

app.use('/api/member', memeberRoute);
app.use('/api/time', timeRoute);
app.use('/api/visitor', visitorRoute);
app.use('/api/admin', adminRoute);


app.get("/", (req, res) => {
  res.send("Hello, World! how are you");
});


const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });