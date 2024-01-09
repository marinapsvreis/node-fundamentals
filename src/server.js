import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Query Parameters: URL Stateful => filtros, paginação, não obrigatórios
// Route Params: URL Stateless => identificar recursos, obrigatórios
// Request Body: dados para criação ou atualização de um registro

const server = http.createServer(async (request, response) => { 
  const { method, url } = request;

  await json(request, response);

  const route = routes.find(route => (
    route.method === method && route.path.test(url)
  ));

  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end('Not found');
});
 
server.listen(3333);

