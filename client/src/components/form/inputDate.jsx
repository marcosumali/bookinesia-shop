import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

export default class inputDate extends Component {
  render() {
    let { inputId, inputLabel, handleChangesDateFunction, openingStatus, openingDate } = this.props
    let options = {}
    if (openingStatus) {
      options = {
        onStart: function() {
          this.set('select', new Date(openingDate))
        }
      }
    }
    return (
      <div>
        <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
        <Row>
          <Input options={ options } id={ inputId } name='on' type='date' onChange={ handleChangesDateFunction } />
        </Row>
      </div>
    )
  }
}
