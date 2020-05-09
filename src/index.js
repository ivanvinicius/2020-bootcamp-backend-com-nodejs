const express = require('express');

const app = express();

app.use(express.json());

/**
 * Tipos de Parâmetros
 * 
 * Query params : Filtros e Paginação (projects?title=reactjs&author=ivan)
 * Route params : Identificar recursos em PUT e DELETE (projects/1)
 * Request Body : Conteúdo no POST e PUT ({ "name": "Ivan Vinicius Boneti" })
 */

app.get('/projects', (request, response) => {
  const { title, author } = request.query;
  const { id } = request.params;
  const { name } = request.body;
});

app.post('/projects', (request, response) => {});

app.put('/projects/:id', (request, response) => {});

app.delete('/projects/:id', (request, response) => {});

app.listen(3333, () => console.log('🚀 backend is running!'));