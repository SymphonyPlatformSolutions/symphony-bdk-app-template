// This is responsible to create the mock server.
const jsonServer = require('json-server');
const Axios = require('axios');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
// Use here your fake data file.
const mockFile = require('./mock-file');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// server.use(router)
server.get('/tasks', (req, res) => {
  res.jsonp(mockFile());
});
server.listen(3000, () => {
  console.log('JSON Server is running');
});

server.post('/api/parser', async (req, res) => {
  const payload = await Axios.post('https://renderer-tool.app.symphony.com/api/parser', req.body);
  res.json(payload.data).status(200).end();
});
