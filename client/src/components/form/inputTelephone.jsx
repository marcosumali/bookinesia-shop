import React, { Component } from 'react';

export default class inputTelephone extends Component {
  render() {
    let { inputId, inputLabel, inputError, inputValue, handleChangesFunction } = this.props
    return (
    <div className="input-field">
      {
        inputError !== false?
        <div>
          <input id={ inputId } type="tel" className="Input-error validate No-margin" onChange={ handleChangesFunction } value={ inputValue }/>
          <label htmlFor={ inputId } className="Form-text active">{ inputLabel }</label>
          <span className="Input-info-error">{ inputError }</span>
        </div>
        :
        <div>
          {
            inputValue.length > 0 ?
            <div>
              <input id={ inputId } type="tel" className="validate No-margin valid" onChange={ handleChangesFunction } value={ inputValue }/>
              <label htmlFor={ inputId } className="Form-text active">{ inputLabel }</label>
            </div>
            :
            <div>
              <input id={ inputId } type="tel" className="validate No-margin" onChange={ handleChangesFunction } value={ inputValue } />
              <label htmlFor={ inputId } className="Form-text">{ inputLabel }</label>
            </div>
          }
        </div>
      }
    </div>

    )
  }
}
