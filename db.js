const { Client } = require('pg');
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
    },
    password: process.env.PASSWORD
});

client.connect()
    .then(() => {
        console.log('Connected to CockroachDB cluster');
    })
    .catch((err) => {
        console.error('Error connecting to CockroachDB cluster', err);
    });

module.exports = client;
