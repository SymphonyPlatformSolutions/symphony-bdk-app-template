# Template Front-End

App - Template using Symphony Extension-Api frontend code.
This project contains: 


- React, to render the components
- JSON-Server, to create a mock-server
- Initialized Jest with Enzyme, for unit testing

## Prerequisites

First you need to install the stable version of [NodeJs](https://nodejs.org/en/)

## Template App Structure
### Overview

The Template App is written in Javascript, using React.js for all its rendering of pages and components. Redux is also used as system-wide state management and I/O.

### ```app.js```, ```controller.js``` and App Configurations

The Extension App is meant to be bootstrapped by Symphony itself, going through a series of handshakes and service connections.
This is done by the app.js and controller.js files, that are called by the main points of entry to the app: the app.html and controller.html files. These two files should be specified as entrypoints by an admin in your POD's AC Portal. You shouldn't worry about these.

Should you want to extend Symphony's services (the [UI service](https://developers.symphony.com/extension/docs/ui-service), for example, when adding custom buttons to chatrooms), the implementation should be done in the ```controller.js``` file.

Your App should be given an ID, Title, Navbar Title and Icon. These should be set in the ```extension-app/utils/system/app-constants.js``` file, and will be perpetuated throughout the rest of the Application.

### Enrichers

A common use for an Extension App is to enrich Symphony Bot messages, by the use of the [entity service](https://developers.symphony.com/extension/docs/entity-service). We have set up enriching via the ```general-enricher.js``` and ```entities.js``` files. Everything related to enriching can be found under ```extension-app/services/enrichers```.

### Authentication
### Backend Communication
### Client-Side Routing

## Running the app

First of all, you should install all project dependencies with the following command:

```
yarn
```

> If you don't have ```yarn``` installed, you can do so by running ```npm install -g yarn```.

After your *node_modules* has been updated, you can run the project in different ways by running the following commands:

- ```yarn test```: runs unit tests and BDD tests. These have been set up initially with jest (powered by enzyme) and cucumber.
- ```yarn build```: encapsulates the whole project in a minified series of files, that are available under the *dist* folder. This is reserved for production building.
- ```yarn start:mock```: compiles project and exposes main files under port ```:4000```. Additionally, it sets up your mock JSON server on port ```:3000```. Since the template app has the Symphony Mock Client as a dependency, directly accessing port 4000 (by going to https://localhost:4000 on your browser) will open the Mock Client shell alongside your Extension App.
> Note: The Mock Client however does not get in the way of externalizing your files. You can still access the Extension App directly in the POD by importing it through the URL (done by adding the ```?bundle=https://localhost:4000/bundle.json``` query parameter after your POD's URL). You can read more on this by accessing [Symphony's official documentation](https://developers.symphony.com/symphony-developer/docs/creating-an-extension-application#section-load-your-application).
- ```yarn start:mock-ext```: 

## Acknowledgments

You can find more about Symphony Extesion-Api in this link: https://extension-api.symphony.com/
