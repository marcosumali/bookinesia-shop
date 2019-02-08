import React, { Component } from 'react';

import EyeSvg from '../svg/eyeSvg';
import EyeOffSvg from '../svg/eyeOffSvg';

export default class inputPassword extends Component {
  constructor() {
    super()
    this.state = {
      visibilityStatus: false
    }
  }

  passwordVisibility() {
    let x = document.getElementById("password")
    if (x.type === "password") {
      x.type = "text"
      this.setState({
        'visibilityStatus': true
      })
    } else {
      x.type = "password"
      this.setState({
        'visibilityStatus': false
      })
    }
  }
  
  render() {

    let {
      inputId, inputLabel, inpuError, inputValue, handleChangesFunction
    } = this.props

    return (
      <div className="input-field">
        {
          inpuError !== false?
          <div>
            <div className="col m11 No-margin No-padding">
              <input 
                autoComplete="off" 
                id={ inputId } 
                type="password" 
                className="Input-error validate No-margin" 
                onChange={ handleChangesFunction } 
                value={ inputValue }
              />
              <label htmlFor={ inputId } className="Form-text active">{ inputLabel }</label>
              <span className="Input-info-error">{ inpuError }</span>
            </div>
            <div className="col m1 No-margin No-padding Margin-t-8 Container-wrap-center" onClick={ () => this.passwordVisibility() }>
              {
                this.state.visibilityStatus ?
                <EyeSvg width="25px" height="22px" color="#666666" />
                :
                <EyeOffSvg width="25px" height="22px" color="#666666" />
              }
            </div>
          </div>
          :
          <div>
            {
              inputValue !== "" ?
              <div>
                  <div className="col m11 No-margin No-padding">
                    <input 
                      autoComplete="off" 
                      id={ inputId } 
                      type="password" 
                      className="validate No-margin valid" 
                      onChange={ handleChangesFunction } 
                      value={ inputValue }
                    />
                    <label htmlFor={ inputId } className="Form-text active">{ inputLabel }</label>
                  </div>
                  <div className="col m1 No-margin No-padding Margin-t-8 Container-wrap-center" onClick={ () => this.passwordVisibility() }>
                    {
                      this.state.visibilityStatus ?
                      <EyeSvg width="25px" height="22px" color="#666666" />
                      :
                      <EyeOffSvg width="25px" height="22px" color="#666666" />
                    }
                  </div>
              </div>
              :
              <div>
                <div className="col m11 No-margin No-padding">
                  <input 
                    autoComplete="off" 
                    id={ inputId } 
                    type="password" 
                    className="validate No-margin" 
                    onChange={ handleChangesFunction } 
                    value={ inputValue } 
                  />
                  <label htmlFor={ inputId } className="Form-text">{ inputLabel }</label>
                </div>
                <div className="col m1 No-margin No-padding Margin-t-8 Container-wrap-center" onClick={ () => this.passwordVisibility() }>
                  {
                    this.state.visibilityStatus ?
                    <EyeSvg width="25px" height="22px" color="#666666" />
                    :
                    <EyeOffSvg width="25px" height="22px" color="#666666" />
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
