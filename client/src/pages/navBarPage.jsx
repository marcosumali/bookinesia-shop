import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import './../assets/css/general.css';
import Navbar from '../components/navbar/navbar';
import LoginPage from './auth/loginPage';
import HomePage from './home/homePage';
import { setCookies, setWindow } from './../store/firestore/management/management.actions';
import { handleCookies } from './../store/firestore/auth/auth.actions';

class navBarPage extends Component {
  componentWillMount() {
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
    this.props.setWindow(window)
    this.props.handleCookies('handleAuth', cookiesFunction)
  }

  render() {

    let {
      authenticationStatus
    } = this.props
    // console.log('navbarPage', this.props)

    return (
      <div>
        <Navbar history={ this.props.history }/>
        {
          this.props.match.path === '/' ?
          <HomePage />
          :
          this.props.match.path === '/signin' ?
          <div>
            {
              authenticationStatus ?
              <Redirect to="/" />
              :
              <LoginPage />
            }
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticationStatus: state.auth.authenticationStatus,
    isOwner: state.auth.isOwner,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCookies,
  setWindow,
  handleCookies,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (navBarPage);

