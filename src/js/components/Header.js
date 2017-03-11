import React, { Component } from 'react'

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">WebАкадемия</a>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-left">
                  <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                              Dropdown
                              <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="#">Action</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something</a></li>
                          <li className="divider"></li>
                          <li><a href="#">Separated link</a></li>
                        </ul>
                  </li>
                </ul>
            </div>
        </div>
      </nav>
    )
  }
}
