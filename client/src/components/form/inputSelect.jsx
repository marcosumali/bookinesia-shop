import React, { Component } from 'react';
import { Input } from 'react-materialize';

export default class inputSelect extends Component {
  render() {
    let { 
      inputId, 
      className,
      inputSize, 
      showLabel, 
      inputLabel, 
      inputValue, 
      optionData,
      inputName,
      purpose,
      handleChangesFunction,
      selectedData
    } = this.props
    return (
      <Input 
        id={ inputId }
        className={ className }
        m={ inputSize } 
        type='select' 
        onChange={ (e, value) => handleChangesFunction(e, value, purpose, inputName, selectedData) } 
        label={ showLabel ? inputLabel : '' } 
        value={ inputValue }
      >
        {
          optionData && optionData.map((data, index) => {
            return (
              <option value={ data } key={ inputName + index }>{ data }</option>
            )
          })
        }
      </Input>
    )
  }
}
