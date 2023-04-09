const express = require('express');
const {nanoid} =require('nanoid');
// import { nanoid } from 'nanoid'
const { v4: uuidv4 } = require('uuid');
const {validateUrl} = require('../utils/util')
const {Client} =require('pg');
const client = require('../db');
const  dotenv = require("dotenv");

dotenv.config();

const router = express.Router();


// Short URL Generator
router.post('/short', async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

//   const urlId = nanoid(7);
const urlId = uuidv4();
  console.log(urlId);
  if (validateUrl(origUrl)) {
        console.log('chal rha hai');
    try {
        console.log(client._connected);
      const query = 'SELECT * FROM shorturl WHERE origUrl=$1';
      const values = [origUrl];
      const { rows } = await client.query(query, values);

      if (rows.length > 0) {
        const url = rows[0];
        console.log('url already exists',url);
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;
        const date = new Date();
        const insertQuery =
          'INSERT INTO shorturl (origUrl, shortUrl, urlId, dateCreated) VALUES ($1, $2, $3, $4)';
        //   'INSERT INTO shorturl (urlId, origUrl, shortUrl, dateCreated) VALUES ($1::VARCHAR, $2, $3, $4)';
        const insertValues = [origUrl, shortUrl, urlId, date];
        //  const insertValues = [urlId, origUrl, shortUrl, date];
        await client.query(insertQuery, insertValues);

        const url = {
          origUrl: origUrl,
          shortUrl: shortUrl,
          urlId: urlId,
          dateCreated: date,
        };
        console.log('url created',url);
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

module.exports = router;
