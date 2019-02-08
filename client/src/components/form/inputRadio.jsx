import React, { Component } from 'react';

export default class inputRadio extends Component {
  doNothing() {

  }
  render() {
    let { inputData, handleChangesFunction, purpose, className, selectedDataId, groupId, checkedStatus } = this.props
    return (
      <div onClick={ () => handleChangesFunction(inputData, purpose) }>
        {
          checkedStatus ?
          <input 
            className="radio-blue with-gap" 
            name={ groupId }
            type="radio" 
            id={ inputData.id }
            value={ inputData.id }
            onChange={ () => this.doNothing }
            checked={ selectedDataId === inputData.id }
          />
          :
          <input 
            className="radio-blue with-gap" 
            name={ groupId }
            type="radio" 
            id={ inputData.id }
            value={ inputData.id }
          />
        }
        <label className={ className } htmlFor={ inputData.id }>{ inputData.name }</label>
      </div>
    )
  }
}
