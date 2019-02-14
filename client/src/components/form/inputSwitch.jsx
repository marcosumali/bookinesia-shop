import React, { Component } from 'react';

export default class inputSwitch extends Component {
  render() {
    let { inputId, inputLabel, inputValue, handleChangesFunction, handleCheckFunction, checkedStatus, showLabel } = this.props
    return (
      <div>
        <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
        <div className="switch">
          <label>
            {
              showLabel ?
              "Off"
              :
              ""
            }
            <input 
              id={ inputId } 
              type="checkbox"
              value={ inputValue }
              onChange={ (e) => handleChangesFunction(e) }
              checked={ handleCheckFunction(checkedStatus) } 
            />
            <span className="lever"></span>
            {
              showLabel ?
              "On"
              :
              ""
            }
          </label>
        </div>       
      </div>
    )
  }
}
