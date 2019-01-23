import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleFilterInputChanges } from '../../../store/dashboard/dashboard.actions';
import { setSelectedBarber } from '../../../store/firestore/staff/staff.actions';
import AddBoxSvg from '../../svg/addBoxSvg';

class manageMenu extends Component {
  filterFunction() {
    let input = this.props.filterInput
    let filter = input.toUpperCase()
    let targetDivs = document.getElementsByClassName('Manage-box')

    for (let i = 0; i < targetDivs.length; i++) {
      let targetTexts = targetDivs[i].getElementsByClassName('Manage-text')[0]

      if (targetTexts.innerHTML.toUpperCase().indexOf(filter) > -1) {
        targetDivs[i].style.display = "";
      } else {
        targetDivs[i].style.display = "none";
      }
    }
  }

  render() {
    let headerText = ''
    let data = []
    let { displayToShow, barbers, setSelectedBarber, staffServices } = this.props
    if (displayToShow === 'Barbers') {
      headerText = 'Barbers'
      data = barbers
    }
    // console.log('manageMenu', this.props)
    return (
      <div>
        <div className="col m12 No-margin No-padding Manage-headers">
          <div className="">{ headerText }</div>
        </div>
        <div className="col m12 No-margin No-padding Margin-b-10 Container-nowrap-center-cross">
          <form className="col m10 l11 No-margin No-padding">
            <div className="input-field ">
              <input id="name" type="text" className="validate No-margin" onKeyUp={ () => this.filterFunction() } onChange={ this.props.handleFilterInputChanges } value={ this.props.filterInput } />
              <label htmlFor="name" className="Form-text">Search for...</label>
            </div>
          </form>
          <div className="col m2 l1 No-margin No-padding Container-nowrap-end">
            <AddBoxSvg width="80%" height="80%" color="#f68606" />
          </div>
        </div>
        <div className="col m12 No-margin No-padding">
          {
            data && data.map((singleData, index) => {
              return displayToShow === 'Barbers' ?
              <div key={ 'data' + index }>
                {
                  singleData.disableStatus ?
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-nowrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedBarber(singleData, staffServices) }
                  >
                    <div className="col m2 l1 No-margin No-padding Container-nowrap-center Barber-image-box">
                      <img className="Barber-image Disabled" src={ singleData.picture } alt={ "image" + index }/>
                    </div>
                    <div className="col m10 l11 No-margin No-padding Container-nowrap-center-cross">
                      <div className="Manage-text Disabled">{ singleData.name }</div>
                    </div>
                  </div>
                  :
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-nowrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedBarber(singleData, staffServices) }
                  >
                    <div className="col m2 l1 No-margin No-padding Container-nowrap-center Barber-image-box">
                      <img className="Barber-image" src={ singleData.picture } alt={ "image" + index }/>
                    </div>
                    <div className="col m10 l11 No-margin No-padding Container-nowrap-center-cross">
                      <div className="Manage-text">{ singleData.name }</div>
                    </div>
                  </div>
                }
              </div>
              :
              <div></div>
            })
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    barbers: state.staff.allBarbers,
    filterInput: state.nav.filterInput,
    staffServices: state.staffService.staffServices,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleFilterInputChanges,
  setSelectedBarber
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageMenu);

