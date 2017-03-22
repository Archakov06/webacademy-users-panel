import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger } from 'react-bootstrap'
import { Radio, RadioGroup } from 'react-icheck'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import 'whatwg-fetch'
import ChartistGraph from 'react-chartist'

import * as appActions from '../actions/appActions'
import * as studentActions from '../actions/studentActions'
import * as taskActions from '../actions/taskActions'

import Card from './layouts/Card'
import AddModal from './AddModal'
import SVGSprites from './layouts/SVGSprites'
import { SVGLink } from '../helpers/SVGLink'

import { fetchz, fetchPOST } from '../helpers'

export class Content extends Component {

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.addTask = this.addTask.bind(this);
    this.setPieChart = this.setPieChart.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      users: []
    };
    const { setUsers, setFilter, setTasks, tableIsLoading } = this.props.appActions;
  }

  componentDidMount(){
    const { setUsers, setFilter, setTasks, tableIsLoading } = this.props.appActions;
    const { studentStore } = this.props;
    const _this = this;

    fetchz('GET', '/users/get', function(json){
      setUsers(json);

      _this.setState({
        users: json
      });

      setTimeout( () => {
        fetchz('GET', '/tasks/get', function(json){
          setTasks(json);
          tableIsLoading(false);
          _this.setPieChart();
        });
      }, 0);

    });

  }

  setPieChart(){
    const { studentStore } = this.props;
    const { setChart } = this.props.appActions;
    const data = studentStore.users.filter( (user) => parseInt(studentStore.filterByMonth) == user.month.value);
    const all = data.length * 6000;
    var have = 0;
    data.forEach( (item) => {
      have += parseInt(item.paid);
    });
    const need = all - have;
    setChart([all, have, need]);
  }

  filteredUsers(arr = []){
    const { studentStore } = this.props;
    var users = arr.length ? arr : studentStore.users;
    users = users.filter( (user) => parseInt(studentStore.filterByMonth) == user.month.value);
    return users;
  }

  openModal(type) {
    const { showAddDialogAction } = this.props.appActions;
    showAddDialogAction(type);
  }

  closeModal() {
    const { hideAddDialogAction } = this.props.appActions;
    hideAddDialogAction();
  }

  getUserById(id){
    const { users } = this.props.studentStore;
    return users.filter( (item) => { return ( item.id === id ); } )[0];
  }

  editUser(id){
    const { setUser } = this.props.appActions;
    const user = this.getUserById(id);
    this.openModal('edit');
    setUser( user );
  }

  showUser(id, event){
    const { setUser } = this.props.appActions;
    const user = this.getUserById(id);
    this.openModal('show');
    setUser( user );
  }

  removeUser(id){
    const { removeUser, setUsers } = this.props.appActions;
    if (confirm('Вы действительно хотите удалить?')) {
      removeUser(id);
      fetchz('GET', `/users/delete/${uid}`, function(json){
        setUsers(json);
      })
    }
  }

  addTask(e){
    if (e.charCode == 13) {
      e.preventDefault();
      const { addTask } = this.props.appActions;

      fetchPOST('/tasks/add', {
        complete: false,
        text: this.task_input.value
      });

      addTask(this.task_input.value);

      this.task_input.value = '';
    }
  }

  removeTask(id){
    const { removeTask } = this.props.appActions;
    if (confirm('Вы действительно хотите удалить?')) {
      removeTask(id);
      fetchz('GET', `/tasks/delete/${id}`)
    }
  }

  handleFilterChange(){
    const { setFilter, setUsers } = this.props.appActions;
    setFilter(this.filterMonth.value);
    setTimeout(()=>{
      this.setState({
        users: this.filteredUsers()
      });
      this.setPieChart();
    });
  }

  render() {

    const { appActions, currentStore, studentStore, taskStore } = this.props;

    const header =
      <div className="users-table__footer">
        <label id="btn-sort">
          <select value={studentStore.filterByMonth} ref={ (node) => { this.filterMonth = node; }} onChange={this.handleFilterChange}>
            {
              studentStore.months.map(function(item, index){
                return (
                  <option key={index} value={item.value}>{item.label}</option>
                )
              })
            }
          </select>
          <b className="caret"></b>
        </label>
        <Button onClick={this.openModal.bind(this,'add')} bsStyle="primary">
          <i className="fa fa-plus" aria-hidden="true"></i>
          Добавить
        </Button>
      </div>;

    return (
        <div className="content">
            <SVGSprites />
              { currentStore.tableIsLoading ?
                <div className="table-loading">
                  <div className="table-loading__center">
                    <span></span>
                    <h4>Загрузка...</h4>
                  </div>
                </div>
              : ''}
            <AddModal appActions={appActions} currentStore={currentStore} studentStore={studentStore} />
            <div className="container-fluid">
                <div className="col-md-8">
                  <div className="users-table">
                    <Card title={`Участники (${ studentStore.users.length})`} header={header}>

                      <table id="users-table" className="table table-striped table-bordered">
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
                            this.state.users.map(function(item, index) {
                              if (parseInt(studentStore.filterByMonth) == item.month.value)
                                return (
                                  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><a onClick={this.showUser.bind(this, item.id)} href="javascript://">{item.firstname} {item.lastname}</a></td>
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
                      { (studentStore.chartData) ? <ChartistGraph data={studentStore.chartData} type="Pie" /> : ''}
                    </Card>
                    <Card title="Задачи">
                      <div className="table-full-width tasks">
                        <table className="table">
                          <tbody>
                            {
                              taskStore.items.map(function(item, index) {
                                return (
                                  <tr key={index}>
                                      <td>{item.text}</td>
                                      <td className="td-actions text-right">
                                          <button onClick={this.removeTask.bind(this, item.id)} type="button" rel="tooltip" title="" className="btn btn-danger btn-simple btn-xs" data-original-title="Remove">
                                              <i className="fa fa-times"></i>
                                          </button>
                                      </td>
                                  </tr>
                                )
                              }.bind(this))
                            }
                          </tbody>
                        </table>
                        <form>
                          <div className="form-group">
                            <textarea onKeyPress={this.addTask} ref={(input) => { this.task_input = input }} name="task_input" className="form-control" placeholder="Введите задачу"/>
                          </div>
                        </form>
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
    taskStore: state.taskStore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(Object.assign({}, appActions, studentActions, taskActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
