import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import './dashboard.css';
import { dispatchToSetDisplayToShow, dispatchToSetSubMenuToShow } from '../../store/dashboard/dashboard.actions';

class subMenuItem extends Component {
  render() {
    return (
      <div>
        {
          this.props.subMenuToShow === this.props.text ?
          <div 
            className="Active Sub-menu-box Container-nowrap-center-cross"
            onClick={ () => this.props.dispatchToSetSubMenuToShow(this.props.text) }
          >
            <div className="Sub-menu-text animated slideInDown">{ this.props.text }</div>
          </div>
          :
          <div 
            className="Sub-menu-box Container-nowrap-center-cross"
            onClick={ () => this.props.dispatchToSetSubMenuToShow(this.props.text) }
          >
            <div className="Sub-menu-text animated slideInDown">{ this.props.text }</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    subMenuToShow: state.nav.subMenuToShow,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchToSetDisplayToShow,
  dispatchToSetSubMenuToShow
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (subMenuItem);

