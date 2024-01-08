import http from 'node:http';
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (request, response) => { 
  const { method, url } = request;

  await json(request, response);

  if (method === 'GET' && url === '/users') { 
    return response
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') { 
    const { name, email } = request.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return response.writeHead(201).end('Usuário criado');
  }  

  return response.writeHead(404).end('Not found');
});
 
server.listen(3333);

