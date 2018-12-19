import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/bookinesia-actions';

class MainPage extends Component {
  render() {
    const { stateStatus, children, changeComponent, showChild } = this.props;
    return (
      <section>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div>Ini simbol</div>
            <div>Bookinesia</div>
          </div>
          <div className="navbar-end">
            <div>Ini di kanan kiri</div>
            <div>Ini di kanan kanan</div>
          </div>
        </nav>
        <div className="bottom-navbar">
          <div className="columns">
            <div className="column is-one-fifth side-bar full-height">
              <div className="container is-fluid">
              <aside className="menu">
                <ul className="menu-list">
                  {
                    stateStatus.map((stt, idx) => (
                      <li onClick={!stt.child ? () => changeComponent(stt.name) : undefined } key={idx}>
                        <a className={`${stt.status ? 'is-active' : ''}`}>
                          <div className={`white-color ${stt.child ? 'space-between' : ''}`}>
                            {
                              `${stt.name}`
                            }
                            {
                              stt.child && (
                              <div>
                                Panah
                              </div>
                              )
                            }
                          </div>
                          {
                            stt.child && stt.childStatus && (
                              <ul>
                                {
                                  stt.child.map((chl, idx) => (
                                    <li>
                                      <a href="" key={idx}>
                                        <div>
                                          {
                                            chl.name
                                          }
                                        </div>
                                      </a>
                                    </li>
                                  ))
                                }
                              </ul>
                            )
                          }
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </aside>
              </div>
            </div>
            <div className="column content full-height">
              <div className="container is-fluid">
                { children }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  stateStatus: state.stateStatus
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
