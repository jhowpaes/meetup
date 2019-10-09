import React from 'react';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import Globalstyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <Globalstyle />
    </Router>
  );
}

export default App;
