import "./App.scss";

import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app-window">
          <Menu />
          <main>
            <Switch>
              <Route path="/">
                <Home/>
              </Route>
              <Route path="/about">
              </Route>
              <Route path="/users">
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
