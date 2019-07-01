/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/main.scss';
import RendererApp from './pages/renderer-app';

SYMPHONY.start();

ReactDOM.render(
  <RendererApp />, document.getElementById('root'),
);
