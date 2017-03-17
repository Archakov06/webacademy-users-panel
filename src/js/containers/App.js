import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../components/Header'
import Content from '../components/Content'

import * as appActions from '../actions/appActions'

export class App extends Component {

  render() {
    const { currentStore } = this.props;

    return (
      <div>
        <Header />
        <Content/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentStore: state.currentStore,
    studentStore: state.studentStore
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
