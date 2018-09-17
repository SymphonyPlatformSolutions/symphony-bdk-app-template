const jsonServer = require('json-server');
const server = jsonServer.create();
// const path = require('path');
// const router = jsonServer.router(path.join(__dirname));
const middlewares = jsonServer.defaults();
const mockTasks = require('./mock-tasks');

server.use(middlewares)
server.use(jsonServer.bodyParser)
// server.use(router)
server.get('/tasks', (req, res) => {   
    res.jsonp(mockTasks())
  })
server.listen(3000, () => {
  console.log('JSON Server is running')
})