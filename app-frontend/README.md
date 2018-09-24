# Template Front-End

App - Template using Symphony Extension-Api frontend code.
This project contains: 


- React, to render the components
- JSON-Server, to create a mock-server
- Initialized Jest with Enzyme, for unit testing

## Prerequisites

First you need to install the stable version of [NodeJs](https://nodejs.org/en/)

### Running the app

First of all, you should install all project dependencies with the following command:
```
npm install
```

There are 4 environments set up: *production*, *development*, *mock* and *test*.

When running ```production```, your code is built into a webpack bundle, that is minized and exposed for production deployment. You can do so by running:
```
npm run build
```

Running ```development``` does not build the webpack bundle. Do it by executing:
```
npm start
```
Running ```mock``` does not build the webpack bundle, and starts up a local JSON server, to mock potential API Backend Calls, serving dummy data. You can set it up by running:
```
npm run start:mock
```
```test``` can be run two ways:
- ```npm run test``` will run the Jest Tests and output their result
- ```npm run watch``` will continuously run tests while watching for code changes.

After you have the server up and running, go to your browser and navigate to your POD:
* Append "bundle=https://localhost:4000/bundle.json" as a URL param to your POD's Symphony address

    For example https://corporate.symphony.com/client/index.html?bundle=https://localhost:4000/bundle.json

* Accept the "Warning: Unauthorized App(s)" dialog
* Click on the "Applications > App Store" entry in your left nav to install the Template app.

## Acknowledgments

You can find more about Symphony Extesion-Api in this link: https://extension-api.symphony.com/
