const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'hello' });
});

app.listen(3333, () => {
  console.log('🚀 Backend is running!');
});