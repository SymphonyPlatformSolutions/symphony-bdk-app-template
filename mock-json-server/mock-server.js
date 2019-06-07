// This is responsible to create the mock server.
const jsonServer = require('json-server');

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

server.listen(3000, () => {
  console.log('JSON Server is running');
});
