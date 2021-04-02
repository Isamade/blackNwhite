import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import ProfileForm from '../profile-forms/ProfileForm';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import BlogPost from '../layout/BlogPost';
import SearchPage from '../layout/SearchPage';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search/:searchString" component={SearchPage} />
        <Route exact path="/blog-post/:id" component={BlogPost} />
        <PrivateRoute exact path="/profile" component={ProfileForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
