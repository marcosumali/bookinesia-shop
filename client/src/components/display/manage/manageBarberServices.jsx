import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedStaffServicesInput } from '../../../store/firestore/staffService/staffService.actions';

class manageBarberServices extends Component {
  handleSecondaryServices = (e) => {
    let target = e.target
    let id = target.id            // id represent key of product in firestore
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false
    console.log('===', id, type, status)
    
    let { selectedStaffServicesInput } = this.props
    console.log('===', selectedStaffServicesInput)
    let checkedIndex = selectedStaffServicesInput.findIndex(staffService => staffService.serviceId === id);
    console.log('===', checkedIndex)

    if (type === 'checkbox' && status) {
      if (checkedIndex <= -1) {
        selectedStaffServicesInput.push(id)
      } 
      console.log('===add', selectedStaffServicesInput)
    } else if (type === 'checkbox' && status === false) {
      if (checkedIndex >= 0) {
        selectedStaffServicesInput.splice(checkedIndex, 1)
        console.log('===deduct', selectedStaffServicesInput)
      }
    }

    console.log('===result', selectedStaffServicesInput)
    this.props.setSelectedStaffServicesInput(selectedStaffServicesInput)     
  }

  handleCheckbox = (service) => {
    let status = false
    let breakStatus = false
    this.props.selectedStaffServicesInput && this.props.selectedStaffServicesInput.map(selectedStaffService => {
      if (service.id === selectedStaffService.serviceId && breakStatus === false) {
        status = true
        breakStatus = true
      }
      return ''
    })
    return status
  }

  render() {
    console.log('manageBarberServices', this.props)
    let { services } = this.props
    return (
      <div className="col m12 Container-wrap-center-cross Margin-b-10">
        <form className="col m12 No-margin No-padding Container-wrap-center-cross">
          {
            services && services.map((service, index) => {
              return (
                <div className="col m12 No-margin No-padding Manage-barber-service-box" key={ 'service' + index }>
                  <input 
                    className="checkbox-blue filled-in" 
                    name="group1" 
                    type="checkbox" 
                    id={ service.id }
                    value={ service.id }
                    onChange={ this.handleSecondaryServices }
                    checked={ this.handleCheckbox(service) }
                  />
                  <label className="Manage-barber-service-text" htmlFor={ service.id }>{ service.name }</label>
                </div>
              )
            })
          }
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    services: state.service.services,
    selectedBarber: state.staff.selectedBarber,
    selectedStaffServices: state.staffService.selectedStaffServices,
    selectedStaffServicesInput: state.staffService.selectedStaffServicesInput,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedStaffServicesInput
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberServices);