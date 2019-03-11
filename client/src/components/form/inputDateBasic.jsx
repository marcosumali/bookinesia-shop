import React, { Component } from 'react';

import { returnAcceptedDate } from '../../helpers/date';

export default class inputDateBasic extends Component {
  render() {
    let { inputId, inputLabel, inputLabelStatus,handleChangesDateFunction, openingStatus, openingDate, className } = this.props
    let acceptedDate = returnAcceptedDate(openingDate)
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
