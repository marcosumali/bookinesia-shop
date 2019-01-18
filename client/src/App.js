import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import HomePage from './pages/home/homePage';
import DashboardPage from './pages/dashboard/dashboardPage';
import NotFoundPage from './pages/error/notFound';
import LoginPage from './pages/auth/loginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/" 
            render={ (props) => (<HomePage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/dashboard" 
            render={ (props) => (<DashboardPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/login" 
            render={ (props) => (<LoginPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route path="*" component={ NotFoundPage } />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
