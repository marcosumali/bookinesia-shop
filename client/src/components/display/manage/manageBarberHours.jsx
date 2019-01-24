import React, { Component } from 'react';
import { Input } from 'react-materialize';

export default class manageBarberHours extends Component {
  render() {
    return (
      <form className="col m12 Container-wrap-center-cross Margin-b-10">
        <div className="col m12 Container-nowrap-center-cross">
          <div className="col m4 Container-nowrap-center-cross">
            <div>Saturday</div>
          </div>
          <div className="col m2 Container-nowrap-center">
            <div>Button</div>
          </div>
          <div className="col m2 Container-nowrap-center">
            <div>
              <Input m={12} type='select' label="" defaultValue="">
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </Input>
            </div>
            <div>00</div>
          </div>
          <div className="col m2 Container-nowrap-center">
            <div>to</div>
          </div>
          <div className="col m2 Container-nowrap-center">
            <div>22</div>
            <div>00</div>
          </div>
        </div>
      </form>
    )
  }
}
