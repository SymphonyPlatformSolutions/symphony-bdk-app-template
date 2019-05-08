// This is responsible to create the mock server.
const jsonServer = require('json-server');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
// Use here your fake data file.
const mockFile = require('./mock-file');

server.use(middlewares);
server.use(jsonServer.bodyParser);
// server.use(router)
server.get('/tasks', (req, res) => {
  res.jsonp(mockFile());
});
server.listen(3000, () => {
  console.log('JSON Server is running');
});
