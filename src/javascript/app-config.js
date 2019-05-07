/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';


function reactApp(Component, store) {
  if (store) {
    React;
  }
}

async function appConfig(data, { configuration }) {
  try {
    const themeColor = data.themeV2.name;
    const themSize = data.themeV2.size;

    document.body.className = `symphony-external-app ${themeColor.themeColor} ${themSize}`;

    await SYMPHONY.remote.hello(data);
  } catch (error) {
    throw new Error('Unable to reach data application please verify');
  }
}
