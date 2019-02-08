import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './login.css';
import EmailInput from '../form/inputEmail';
import PasswordInput from '../form/inputPassword';
import Button from '../button/button';
import LoadingSizeButton from '../button/buttonLoadingSize';
import { authSignIn, handleChangesLogin } from '../../store/firestore/auth/auth.actions';

class login extends Component {
  render() {
    let {
      email,
      emailError,
      password,
      passwordError,
      handleChangesLogin,
      loginError,
      loadingStatus,
      authSignIn,
      cookies, 
      window,
    } = this.props
    // console.log('auth', this.props)
    return (
      <div className="row No-margin">
        <div className="col m12 Container-wrap-center Login-box">
          <div className="col m12 Login-header-box Container-wrap-center ">
            <div className="Login-header-text">LOGIN</div>
          </div>
          <div className="col m12 Login-form-box Container-wrap-center">
            <form className="col m4">
              <div className="col m12 Email-box">
                <EmailInput 
                  inputId="email"
                  inputLabel="Email"
                  inputError={ emailError }
                  inputValue={ email }
                  handleChangesFunction={ handleChangesLogin }
                />
              </div>

              <div className="col m12 Password-box">
                <PasswordInput 
                  inputId="password"
                  inputLabel="Password"
                  inputError={ passwordError }
                  inputValue={ password }
                  handleChangesFunction={ handleChangesLogin }
                />
              </div>
            </form>
          </div>

          {
            loginError !== false ?
            <div className="col m12 Container-wrap-center">
              <div className="Input-info-error">{ loginError }</div>
            </div>
            :
            <div></div>
          }

          <div className="col m12 Container-wrap-center Button-box">
            {
              loadingStatus ?
              <LoadingSizeButton 
                type="Btn-large-white-blue Container-nowrap-center"
                height="1.5em"
                width="5em"
                color="#ffffff"
              />
              :
              <Button 
                text="Login"
                type="Btn-large-white-blue"
                clickFunction={ authSignIn }
                data={{ email, password, window, cookies }}
              />
            }
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    email: state.auth.email,
    emailError: state.auth.emailError,
    password: state.auth.password,
    passwordError: state.auth.passwordError,
    loadingStatus: state.auth.loadingStatus,
    loginError: state.auth.loginError,
    window: state.user.window,
    cookies: state.user.cookies,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignIn,
  handleChangesLogin
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (login);
