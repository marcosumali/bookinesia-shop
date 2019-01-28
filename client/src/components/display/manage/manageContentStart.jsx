import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SmileyFaceSvg from '../../svg/smileyFaceSvg';

class manageContentStart extends Component {
  render() {
    let { displayToShow } = this.props
    return (
      <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-axis">
        <div className="col m12 No-margin No-padding Container-nowrap-center-end">
          <div className="col m12 No-margin No-padding Container-wrap-center animated fadeIn faster">
            <SmileyFaceSvg width="5em" height="5em" color="#5499c3"/> 
          </div>
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-center-start">
          <div className="col m8 No-margin No-padding Container-wrap-center animated fadeIn faster">
            {
              displayToShow === 'Providers' ?
              <div className="Start-text">Click on any of the providers on the list to edit, or press the + button to add new provider.</div>
              :
              displayToShow === 'Services' ?
              <div className="Start-text">Click on any of the services on the list to edit, or press the + button to add new service.</div>
              :
              <div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageContentStart);

