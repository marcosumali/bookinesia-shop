import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar , NavItem } from 'react-materialize';

import './navbar.css';

class navbar extends Component {
  render() {

    let {
      isAuthenticated
    } = this.props

    return (
      <div className="Nav-outer-box">
        <Navbar className="Nav-box" brand='Bookinesia' right fixed>
          <div>
            {
              isAuthenticated ?
              <NavItem href="/dashboard">
                Dashboard
              </NavItem>
              :
              <NavItem href="/login">
                Login
              </NavItem>
            }
          </div>
        </Navbar>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isOwner: state.auth.isOwner,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (navbar);
