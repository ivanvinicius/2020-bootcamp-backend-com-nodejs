const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

/**
 * Tipos de Parâmetros
 * 
 * Query params : Filtros e Paginação                   (projects?title=reactjs&author=ivan)
 * Route params : Identificar recursos em PUT e DELETE  (projects/1)
 * Request Body : Conteúdo no POST e PUT                ({ "name": "Ivan Vinicius Boneti" })
 */

 /**
  * Middlewares
  * 
  * Interceptador de requisições que pode interromper uma requisição ou alterar dados da mesma
  */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel)
  
  next();

  console.timeEnd(logLabel)
}

function validadeProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validadeProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const result = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(result);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectindex = projects.findIndex(project => project.id === id);

  if(projectindex < 0) {
    return response.status(400).json({ error: 'Project not found.'});
  }

  const project = {
    id, 
    title,
    owner
  };

  projects[projectindex] = project;

  return response.json(project);  
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => console.log('🚀 backend is running!'));