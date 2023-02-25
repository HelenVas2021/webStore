import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 5000;
import categories from './data.js';
import orders from './orders.js';

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(PORT);

server.get('/categories', (request, response) => {
  response.send(JSON.stringify(categories))
})

server.get('/orders', (request, response) => {
  response.send(JSON.stringify(orders))
})

server.post('/orders', (request, response) => {
  const newOrder = request.body;
  orders.push(newOrder)
  
  response.send('ok')
})

