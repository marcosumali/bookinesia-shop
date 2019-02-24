import React, { Component } from 'react';

export default class inputDateBasic extends Component {
  render() {
    let { inputId, inputLabel, inputLabelStatus,handleChangesDateFunction, openingStatus, openingDate, className } = this.props
    let inputDate = new Date(openingDate)
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()

    if (String(month).length <= 1) {
      month = '0' + month      
    }
    
    if (String(date).length <= 1) {
      date = '0' + date      
    }
    let acceptedDate = `${year}-${month}-${date}`
    
    return (
      <div className={ className }>
        {
          inputLabelStatus ?
          <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
          :
          <div></div>
        }
        <input 
          id={ inputId }
          className="Input-date"
          type="date"
          required="required"
          onChange={ handleChangesDateFunction }
          value={ openingStatus ? acceptedDate: "" }
        />
      </div>
    )
  }
}
