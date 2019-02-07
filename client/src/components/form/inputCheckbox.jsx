import React, { Component } from 'react';

export default class inputCheckbox extends Component {
  render() {
    let { inputData, handleChangesFunction, handleCheckedFunction, multipleData, purpose, checkedStatus, className, groupId } = this.props
    return (
      <div>
        {
          checkedStatus ?
          <input 
            className="checkbox-blue filled-in" 
            name={ groupId }
            type="checkbox" 
            id={ inputData.id }
            value={ inputData.id }
            onChange={ (e) => handleChangesFunction(e, multipleData, purpose) }
            checked={ handleCheckedFunction(inputData, multipleData, purpose) }
          />
          :
          <input 
            className="checkbox-blue filled-in" 
            name={ groupId }
            type="checkbox" 
            id={ inputData.id }
            value={ inputData.id }
            onChange={ (e) => handleChangesFunction(e, multipleData, purpose) }
          />
        }
        <label className={ className } htmlFor={ inputData.id }>{ inputData.name }</label>
      </div>
    )
  }
}
