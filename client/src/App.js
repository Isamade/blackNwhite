import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
          <footer>
            <div className="social-links">
              <a href="https://web.facebook.com/francis.anja"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/chronoscrade"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/defiance_black/"><i className="fab fa-instagram"></i></a>
            </div>
            <span>PillarCast</span>
          </footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
