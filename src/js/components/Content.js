import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger } from 'react-bootstrap'
import { Radio, RadioGroup } from 'react-icheck'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import 'whatwg-fetch'
import ChartistGraph from 'react-chartist';

import * as appActions from '../actions/appActions'
import * as studentActions from '../actions/studentActions'

import Card from './Layouts/Card'
import AddModal from './AddModal'

import { fetchz } from '../helpers'

export class Content extends Component {

  componentDidMount(){
    const { setUsers } = this.props.appActions;
    const { studentStore } = this.props;
    const _this = this;
    fetchz('GET', '/users/get', function(json){
      setUsers(json);

      const makePieData = (json) => {
        const all = json.length * 6000;
        var have = 0;
        json.forEach( (item) => {
          have += parseInt(item.paid);
        });
        const need = all - have;
        return [all, have, need];
      }

      _this.setState({
        data: {
          series: makePieData(json)
        }
      });

    });
  }

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      data: {
        series: []
      }
    }
  }

  openModal(type) {
    const { showAddDialogAction } = this.props.appActions;
    showAddDialogAction(type);
  }

  closeModal() {
    const { hideAddDialogAction } = this.props.appActions;
    hideAddDialogAction();
  }

  editUser(uid){
    const { users } = this.props.studentStore;
    const { setUser } = this.props.appActions;
    this.openModal('edit');
    const user = users.filter( (item) => { return ( item.id === uid ); } );
    setUser( user[0] );
  }

  removeUser(uid){
    const { removeUser, setUsers } = this.props.appActions;
    if (confirm('Вы действительно хотите удалить?')) {
      removeUser(uid);
      fetchz('GET', `/users/delete/${uid}`, function(json){
        setUsers(json);
      })
    }
  }

  render() {

    const { appActions, currentStore, studentStore } = this.props;

    const footer =
      <div className="users-table__footer">
        <Button onClick={this.openModal.bind(this,'add')} bsStyle="primary">
          <i className="fa fa-plus" aria-hidden="true"></i>
          Добавить
        </Button>
      </div>;

    return (
        <div className="content">
            <AddModal appActions={appActions} currentStore={currentStore} studentStore={studentStore} />
            <div className="container-fluid">
                <div className="col-md-8">
                  <div className="users-table">
                    <Card title={`Участники (${ studentStore.users.length})`} header={footer}>
                      <table className="table table-striped table-bordered">
                        <tbody>
                          <tr>
                            <th>#</th>
                            <th>Ф.И.О.</th>
                            <th>Номер телефона</th>
                            <th>E-Mail</th>
                            <th>Оплачено</th>
                            <th></th>
                          </tr>
                          {
                            studentStore.users.map(function(item, index) {
                              return (
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.firstname} {item.lastname}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>{item.paid} руб.</td>
                                <td>
                                  <div className="users-table__btns">
                                    <i onClick={this.editUser.bind(this, item.id)} className="fa fa-pencil" aria-hidden="true"></i>
                                    <i onClick={this.removeUser.bind(this, item.id)} className="fa fa-times" aria-hidden="true"></i>
                                  </div>
                                </td>
                              </tr>
                              )
                            }.bind(this))
                          }
                        </tbody>
                      </table>
                    </Card>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="right-bar">
                    <Card title="Статистика" category="Статистика всего / доход / недостатков" footer={
                        <div className="footer">
                          <hr/>
                          <div className="legend">
                            <ul>
                              <li><i className="fa fa-circle text-info"></i> Всего</li>
                              <li><i className="fa fa-circle text-danger"></i> Оплачено</li>
                              <li><i className="fa fa-circle text-warning"></i> Подлежит оплате</li>
                            </ul>
                          </div>
                        </div>
                      }>
                      { (this.state.data) ? <ChartistGraph data={this.state.data} type="Pie" /> : ''}
                    </Card>
                    <Card title="Задачи">
                      <div className="table-full-width">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="checkbox">
                                            <span className="icons">
                                              <span className="first-icon fa fa-square-o"></span>
                                              <span className="second-icon fa fa-check-square-o"></span>
                                            </span>
                                            <input type="checkbox" value="" data-toggle="checkbox" />
                                        </label>
                                    </td>
                                    <td>Заказать рекламу на: ИТТ, ТВ, в пабликах</td>
                                    <td className="td-actions text-right">
                                        <button type="button" rel="tooltip" title="" className="btn btn-info btn-simple btn-xs" data-original-title="Edit Task">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button type="button" rel="tooltip" title="" className="btn btn-danger btn-simple btn-xs" data-original-title="Remove">
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </div>
            </div>
        </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentStore: state.currentStore,
    studentStore: state.studentStore,
    API: state.API
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(Object.assign({}, appActions, studentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
