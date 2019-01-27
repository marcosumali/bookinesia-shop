import React, { Component } from 'react';

export default class inputFile extends Component {
  render() {
    let { inputId, inputLabel, handleChangesFunction, fileSizeError } = this.props
    return (
      <div>
        <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input 
              type="file" 
              id={ inputId } 
              onChange={ (e) => handleChangesFunction(e) }
            />
          </div>
          <div className="file-path-wrapper">
            <input 
              id="image-text" 
              className="file-path validate" 
              type="text" 
            />
          </div>
        </div>
        {
          fileSizeError ?
          <label htmlFor="image-text" className="Input-info-error Image-text-error">{ fileSizeError }</label>
          :
          <div></div>
        }
      </div>
    )
  }
}
