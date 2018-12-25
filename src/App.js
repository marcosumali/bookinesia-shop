import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Welcome, Manage, Calendar, Report } from './components/index';
import MainPage from './pages/main-page/main-page';
import './style/bulma.css';
import './style/custom.css';

class App extends Component {
  renderComponent = (currentState) => {
    switch(currentState) {
      case 'Welcome': return <Welcome />
      case 'Calendar': return <Calendar />
      case 'Manage': return <Manage />
      case 'Reports': return <Report />
      default: break;
    }
  }

  render() {
    const { stateStatus } = this.props;
    const currentState = stateStatus.filter(stt => {
      if (stt.status) {
        return stt.name
      }
    });
    return (
      <MainPage>
        <div>
          {
            this.renderComponent(currentState[0].name)
          }
        </div>
      </MainPage>
    );
  }
};

const mapStateToProps = state => ({
  stateStatus: state.stateStatus
});

export default connect(mapStateToProps, null)(App);
