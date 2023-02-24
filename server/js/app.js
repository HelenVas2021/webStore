import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 5000;
import categories from './data.js';

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(PORT);

server.get('/categories', (request, response) => {
  response.send(JSON.stringify(categories))
})

