import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Passes from './components/Passes';
import Users from './components/Users';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={ Home } /> 
          <Route path="/about" component={ About } /> 
          <Route path="/passes" exact component={ Passes } />
          <Route path="/users" component={ Users } />
          <Route path="/users/:id" component={ UserDetail } />
        </Switch>  
      </div>
    </Router>
  );
}

export default App; 