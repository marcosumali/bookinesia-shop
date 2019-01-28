import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleFilterInputChanges } from '../../../store/dashboard/dashboard.actions';
import { setSelectedBarberAndOtherData } from '../../../store/firestore/staff/staff.actions';
import { setSelectedServiceAndOtherData } from '../../../store/firestore/service/service.actions';
import AddProviderModal from '../../modal/manage/modalAddProvider';
import AddServiceModal from '../../modal/manage/modalAddService';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import { formatMoney } from '../../../helpers/currency';

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

    let { 
      displayToShow, 
      barbers, 
      setSelectedBarberAndOtherData, 
      staffServices, 
      staffSchedules, 
      services, 
      setSelectedServiceAndOtherData 
    } = this.props
    
    if (displayToShow === 'Providers') {
      headerText = 'Providers'
      data = barbers
    } else if (displayToShow === 'Services') {
      headerText = 'Services'
      data = services
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
              <input 
                id="name" 
                type="text" 
                className="validate No-margin" 
                onKeyUp={ () => this.filterFunction() } 
                onChange={ this.props.handleFilterInputChanges } 
                value={ this.props.filterInput }
              />
              <label htmlFor="name" className="Form-text">Search for...</label>
            </div>
          </form>
          <div className="col m2 l1 No-margin No-padding Container-nowrap-end">
            {
              displayToShow === 'Providers' ?
              <AddProviderModal />
              :
              displayToShow === 'Services' ?
              <AddServiceModal />
              :
              <div></div>
            }
          </div>
        </div>
        <div className="col m12 No-margin No-padding">
          {
            data && data.map((singleData, index) => {
              return displayToShow === 'Providers' ?
              <div key={ 'data' + index }>
                {
                  singleData.disableStatus ?
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-nowrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedBarberAndOtherData(singleData, staffServices, staffSchedules) }
                  >
                    <div className="col m2 l1 No-margin No-padding Container-nowrap-center Barber-image-box">
                      {
                        singleData.picture.length <= 0 ?
                        <AccountCircleSvg className="Disabled" width="100%" height="100%" color="#666666" />
                        :
                        <img className="Barber-image Disabled" src={ singleData.picture } alt={ "image" + index }/>
                      }
                    </div>
                    <div className="col m10 l11 No-margin No-padding Container-nowrap-center-cross">
                      <div className="Manage-text Disabled">{ singleData.name }</div>
                    </div>
                  </div>
                  :
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-nowrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedBarberAndOtherData(singleData, staffServices, staffSchedules) }
                  >
                    <div className="col m2 l1 No-margin No-padding Container-nowrap-center Barber-image-box">
                      {
                        singleData.picture.length <= 0 ?
                        <AccountCircleSvg className="" width="100%" height="100%" color="#666666" />
                        :
                        <img className="Barber-image" src={ singleData.picture } alt={ "image" + index }/>
                      }
                    </div>
                    <div className="col m10 l11 No-margin No-padding Container-nowrap-center-cross">
                      <div className="Manage-text">{ singleData.name }</div>
                    </div>
                  </div>
                }
              </div>
              :
              displayToShow === 'Services' ?
              <div key={ 'data' + index }>
                {
                  singleData.disableStatus ?
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-wrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedServiceAndOtherData(singleData) }
                  >
                    <div className="col m12 No-margin No-padding Container-nowrap-center-cross Margin-b-5">
                      <div className="Manage-text Disabled">{ singleData.name }</div>
                    </div>
                    <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
                      <div className="col m6 Container-nowrap-start">
                        <div className="Manage-text-gray Disabled">{ singleData.duration } minutes</div>
                      </div>
                      <div className="col m6 Container-nowrap-end">
                        <div className="Manage-text-gray Disabled">{ singleData.currency } { formatMoney(singleData.price) }</div>
                      </div>
                    </div>
                  </div>
                  :
                  <div 
                    className="col m12 No-margin No-padding Manage-box Container-wrap-center-cross animated fadeIn faster"
                    onClick={ () => setSelectedServiceAndOtherData(singleData) }
                  >
                    <div className="col m12 No-margin No-padding Container-nowrap-center-cross Margin-b-5">
                      <div className="Manage-text">{ singleData.name }</div>
                    </div>
                    <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
                      <div className="col m6 Container-nowrap-start">
                        <div className="Manage-text-gray">{ singleData.duration } minutes</div>
                      </div>
                      <div className="col m6 Container-nowrap-end">
                        <div className="Manage-text-gray">{ singleData.currency } { formatMoney(singleData.price) }</div>
                      </div>
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
    services: state.service.allServices,
    filterInput: state.nav.filterInput,
    staffServices: state.staffService.staffServices,
    staffSchedules: state.staffSchedule.staffSchedules,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleFilterInputChanges,
  setSelectedBarberAndOtherData,
  setSelectedServiceAndOtherData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageMenu);

