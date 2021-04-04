import "./App.scss";

import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Entities from "./components/Entities/Entities";
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import { Provider } from 'react-redux';
import React from 'react';
import Workspace from "./components/Workspace/Workspace";
import configureStore from './store';

const store = configureStore();
const routes = [
  {
    exact: true,
    path: "/",
    component: Home
  },
  {
    path: "/profile/:userId",
    component: Profile
  },
  {
    path: "/workspace/:id",
    component: Workspace
  },
  {
    path: "/entities",
    component: Entities
  },
  {
    path: "/*",
    component: NotFound
  }
];


function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="app-window">
            <Menu />
            <main>
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

function RouteWithSubRoutes(route: typeof routes[0]) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props: any) => (
        <route.component {...props} />
      )}
    />
  );
}
export default App;
