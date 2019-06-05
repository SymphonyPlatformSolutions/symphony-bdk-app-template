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
server.get('/demoEndpoint', (req, res) => {
  send(() => {
    const value = generateDemoInfo();
    res.jsonp(value);
  });
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
