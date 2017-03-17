import React, { Component } from 'react'

export default class Header extends Component {

  constructor(props){
    super(props);
    this.exportTable = this.exportTable.bind(this);
    this.printTable = this.printTable.bind(this);
  }

  printTable(e){
    var divToPrint = document.getElementById('users-table');
    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  exportTable(e){
    e.preventDefault();

    var data_type = 'data:application/vnd.ms-excel';
    var userTable = document.getElementById('users-table');
    var userTableHtml = userTable.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + userTableHtml;
    a.download = 'exported_table_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    a.click();
  }

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
                          Файл
                          <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="#">Добавить из XLS</a></li>
                          <li><a onClick={this.exportTable} href="#">Сохранить в XLS</a></li>
                          <li className="divider"></li>
                          <li><a onClick={this.printTable} href="#">Печать</a></li>
                        </ul>
                  </li>
                  <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                          Настройки
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
