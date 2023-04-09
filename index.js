const express = require('express');
const { Client } = require('pg');
const  dotenv = require("dotenv");
const  cors = require("cors");
const  shortid = require("shortid");
const client = require('./db');



const urlsRouter = require('./routes/urls');
const appRouter = require('./routes/app')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());



// Create the shorturl table if it doesn't exist
client.query(`
  CREATE TABLE IF NOT EXISTS shorturl (
    urlId UUID PRIMARY KEY,
    origUrl TEXT NOT NULL,
    shortUrl TEXT NOT NULL,
    dateCreated TIMESTAMP NOT NULL DEFAULT now()
  );`,
   (err, res) => {
    if (err) throw err;
    console.log('shorturl table created successfully');
});
app.use('/api', urlsRouter);
app.use('/', appRouter);


// Server Setup
// const PORT = process.env.PORT || 3333;
 const PORT =  3333;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});
