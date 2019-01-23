import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleSingleCheckbox, handleCheckedStatus } from '../../../store/dashboard/dashboard.actions';
import { setBarberInfo, handleChangesManageBarbers, updateBarberData } from '../../../store/firestore/staff/staff.actions';
import TextInput from '../../form/inputText';
import SwitchInput from '../../form/inputSwitch';
import Button from '../../button/button';

class manageBarberDetails extends Component {
  render() {
    let { 
      selectedBarber, 
      barberName, 
      barberNameError, 
      handleChangesManageBarbers, 
      handleSingleCheckbox, 
      barberDisableStatus, 
      handleCheckedStatus,
      setBarberInfo,
      updateBarberData
    } = this.props
    return (
      <div className="col m12 Container-wrap-center-cross Margin-b-10">
        <div className="col m10 offset-m1 Container-nowrap-center-cross Margin-b-16">
          <div className="col m2 No-margin No-padding">
            <div className="col m12 No-margin No-padding">
              <img className="Barber-image-inner" src={ selectedBarber.picture } alt="inner-img"/>
            </div>
          </div>
          <div className="col m10 No-margin No-padding Container-wrap-center-cross">
            <form className="col m12 No-margin No-padding Container-wrap-center-cross">
              <div className="col m11 Margin-l-10 Margin-b-10">
                <TextInput 
                  inputId="name"
                  inputLabel="Name"
                  inputError={ barberNameError }
                  inputValue={ barberName }
                  handleChangesFunction={ handleChangesManageBarbers }
                />
              </div>
              <div className="col m11 Margin-l-10">
                <SwitchInput 
                  inputId="barberStatus"
                  inputLabel="Status"
                  inputValue={ barberDisableStatus }
                  handleChangesFunction={ handleSingleCheckbox }
                  handleCheckFunction={ handleCheckedStatus }
                  checkedStatus={ barberDisableStatus }
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-end Margin-b-10">
          <Button 
            text="Cancel"
            type="Btn-blue"
            clickFunction={ setBarberInfo }
            data={ selectedBarber }
          />
          <Button 
            text="Save"
            type="Btn-white-blue"
            clickFunction={ updateBarberData }
            data={{ id: selectedBarber.id, name: barberName, disableStatus: barberDisableStatus, selectedBarber }}
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedBarber: state.staff.selectedBarber,
    barberName: state.staff.barberName,
    barberNameError: state.staff.barberNameError,
    barberDisableStatus: state.staff.barberDisableStatus,
    activeTab: state.nav.activeTab,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setBarberInfo,
  handleChangesManageBarbers,
  handleSingleCheckbox,
  handleCheckedStatus,
  updateBarberData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberDetails);