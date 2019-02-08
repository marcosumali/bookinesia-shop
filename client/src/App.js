import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import './App.css';
import DashboardPage from './pages/dashboard/dashboardPage';
import NotFoundPage from './pages/error/notFound';
import NavBarPage from './pages/navBarPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/" 
            render={ (props) => (<NavBarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/dashboard" 
            render={ (props) => (<DashboardPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/login" 
            render={ (props) => (<NavBarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route path="*" component={ NotFoundPage } />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
