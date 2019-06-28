// This is responsible to create the mock server.
const jsonServer = require('json-server');
const Axios = require('axios');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const { generateDemoInfo } = require('./mock-file');

// Mock delay, for testing loading states. Units are in ms.
const MOCK_DELAY = 1000;

function send(callback) {
  if (MOCK_DELAY) {
    setTimeout(callback, MOCK_DELAY);
  } else {
    callback();
  }
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.post('/api/parser', async (req, res) => {
  const payload = await Axios.post('https://renderer-tool.app.symphony.com/api/parser', req.body);
  res.json(payload.data).status(200).end();
});


/*
  -- DEMO
  Demo endpoint, serving a very simple body payload, to show an example of how to externalize
  mock content.
  It can - and should - be deleted when developing your own integration.
*/
const fruit = generateDemoInfo();
server.get('/demoEndpoint', (req, res) => {
  send(() => {
    res.jsonp({ content: fruit });
  });
});

server.put('/demoEndpoint/:id', (req, res) => {
  const editId = parseInt(req.params.id, 10);
  const editIndex = fruit.findIndex(el => el.id === editId);

  if (editIndex >= 0 && editIndex < fruit.length) {
    fruit[editIndex] = {
      ...fruit[editIndex],
      ...req.body,
    };
    send(() => {
      res.sendStatus(200);
    });
  } else {
    send(() => {
      res.sendStatus(500);
    });
  }
});

// server.use(router)
server.get('/tasks', (req, res) => {
  res.jsonp(mockFile());
});

server.delete('/demoEndpoint/:id', (req, res) => {
  const editId = parseInt(req.params.id, 10);
  const editIndex = fruit.findIndex(el => el.id === editId);

  if (editIndex >= 0 && editIndex < fruit.length) {
    fruit.splice(editIndex, 1);
    send(() => {
      res.sendStatus(200);
    });
  } else {
    send(() => {
      res.sendStatus(500);
    });
  }
});

server.post('/demoEndpoint', (req, res) => {
  const newId = fruit.reduce((acc, el) => (el.id > acc ? el.id : acc), -1) + 1;
  fruit.push({ ...req.body, id: newId });
  send(() => {
    res.jsonp(newId);
  });
});

server.post('/application/authenticate', (req, res) => {
  res.sendStatus(200);
});

server.post('/application/tokens/validate', (req, res) => {
  res.sendStatus(200);
});

server.post('/application/jwt/validate', (req, res) => {
  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
