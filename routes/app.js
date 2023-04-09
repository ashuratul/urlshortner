
const express = require('express');
const { Client } = require('pg')
const client = require('../db');
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Redirect to Original URL
router.get('/:urlId', async (req, res) => {
    // console.log(req.params.urlId)
    if (!req.params.urlId) {
        return res.status(400).json('Invalid request');
    }
    // const { urlId } = req.params;
    const x= req.params.urlId;
    console.log('id',x);

    try {
        // const query = 'SELECT origUrl FROM shorturl WHERE urlId=$1';
        const query = 'SELECT origurl FROM shorturl WHERE urlid=$1';
        // const values = [urlId];
        const values=[x];
          console.log('values',values);
        //   const result = await client.query(query, values);
        const { rows } = await client.query(query, values);
        console.log(rows[0]);
        if (rows.length > 0) {
            console.log(rows.length);
            const origUrl = rows[0].origurl;
            // const y = rows[0].origUrl;
            console.log(origUrl);
            // res.redirect(origUrl);
            res.json({ url: origUrl });
        } else {
            res.status(404).json('URL not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
