import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/bookinesia-actions';
import Customer from './customer';
import Transaction from './transaction';

class Reports extends Component {
  renderChild = (child) => {
    const currChild = child.filter(stt => {
      if (stt.status === true) {
        return stt
      }
    })
    switch(currChild[0].name) {
      case 'Customer': return <Customer />
      case 'Transaction': return <Transaction />
      default: break;
    }
  }

  render() {
    const { stateStatus } = this.props;
    const child = stateStatus.filter(stt => {
      if (stt.name === 'Reports') {
        return stt.child
      }
    });
    return (
      <div>
        {
          this.renderChild(child[0].child)
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  stateStatus: state.stateStatus
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
