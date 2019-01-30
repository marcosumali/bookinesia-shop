import React, { Component } from 'react';

export default class inputDateBasic extends Component {
  render() {
    let { inputId, inputLabel, handleChangesDateFunction, openingStatus, openingDate } = this.props
    return (
      <div className="input-field Input-date-box">
        <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
        <input 
          id={ inputId }
          className="Input-date"
          type="date"
          onChange={ handleChangesDateFunction }
          defaultValue={ openingStatus ? openingDate: "" }
        />
      </div>
    )
  }
}
