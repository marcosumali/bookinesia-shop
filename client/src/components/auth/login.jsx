import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authSignIn } from '../../store/firestore/auth/auth.actions';

class login extends Component {
  render() {
    return (
      <div>
        LOGIN COMPONENT
        <form>
          <div className="input-field">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email" className="active">Email</label>
          </div>

          <div className="input-field">
            <input autoComplete="off" id="password" type="password" className="validate" />
            <label htmlFor="password" className="active">Password</label>
          </div>

        </form>

        <button onClick={ () => this.props.authSignIn('owner.dummyshop.bekasi@example.com', '12312312') }>LOGIN</button>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignIn
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (login);
