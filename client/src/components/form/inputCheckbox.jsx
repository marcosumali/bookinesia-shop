import React, { Component } from 'react';

export default class inputCheckbox extends Component {
  render() {
    let { inputData, handleChangesFunction, handleCheckedFunction, multipleData } = this.props
    return (
      <div>
        <input 
          className="checkbox-blue filled-in" 
          name="group1" 
          type="checkbox" 
          id={ inputData.id }
          value={ inputData.id }
          onChange={ (e) => handleChangesFunction(e, multipleData) }
          checked={ handleCheckedFunction(inputData, multipleData) }
        />
        <label className="Manage-barber-service-text" htmlFor={ inputData.id }>{ inputData.name }</label>
      </div>
    )
  }
}
