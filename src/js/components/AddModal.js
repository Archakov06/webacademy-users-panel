import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger } from 'react-bootstrap'
import Select from 'react-select'
import MaskedField from 'react-masked-field'
import 'whatwg-fetch'

import Switch from './layouts/switch'
import { fetchz, fetchPOST } from '../helpers'

export default class Content extends Component {

  constructor(props){
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.userGenerate = this.userGenerate.bind(this);
    this.handleSelectMonthChange = this.handleSelectMonthChange.bind(this);

    // this.setState({
    //   monthsSelected: {value: studentStore.user.month, label: this.monthToString(studentStore.user.month)}
    // });

  }

  checkEditing() {
    const { currentStore } = this.props;
    return currentStore.dialogType == 'edit' || currentStore.dialogType == 'show' ? true : false;
  }

  userGenerate(){
    const { studentStore } = this.props;
    var sources = studentStore.sources;
    const phone = document.querySelector('[name="phone"]').value;
    return {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      age: this.age.value,
      phone: phone,
      email: this.email.value,
      sources: JSON.stringify(studentStore.sources),
      about: this.about.value,
      paid: this.paid.value,
      month: JSON.stringify(studentStore.monthsSelected),
      visiting: this.visiting.state.checked
    }
  }

  handleSelectChange(items) {
    const { setSource } = this.props.appActions;
    setSource(items);
    //setUser(this.userGenerate());
  }

  handleSelectMonthChange(items) {
    const { setMonth } = this.props.appActions;
    setMonth(items);
  }

  errorInput(name, b = true){
    if (b)
      document.querySelector('[name="'+ name +'"]').classList.add('error');
    else
      document.querySelector('[name="'+ name +'"]').classList.remove('error');
  }

  sendForm(){
    const { setUser, setUsers, hideAddDialogAction } = this.props.appActions;
    const { studentStore } = this.props;
    const { dialogType } = this.props.currentStore;
    const user = this.userGenerate();
    setUser(user);

    user.id = studentStore.user.id ? studentStore.user.id : null;

    document.querySelectorAll('.form-group input').forEach( (item) => item.classList.remove('error') );

    if ( user.firstname.length < 3 || !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(user.firstname) ) {
      this.errorInput('firstname');
    }

    if ( user.lastname.length < 3 || !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(user.lastname) ) {
      this.errorInput('lastname');
    }

    if (!studentStore.sources.length) alert('Заполните поле "Откуда узнал".');

    if ( !user.age || user.age <= 0 ) this.errorInput('age');

    if ( !user.phone || !/^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/.test(user.phone) ) this.errorInput('phone');

    if ( !/^\d+$/.test(user.paid) ) this.errorInput('paid');

    if (document.querySelectorAll('.form-group input.error').length) {
      return false;
    }

    fetchPOST(`/users/${ dialogType }`, user, function(json){
      setUsers(json);
      hideAddDialogAction();
    });
  }

  monthToString(n){
    switch (n) {
      case 1: return 'Январь';
      case 2: return 'Февраль';
      case 3: return 'Март';
      case 4: return 'Апрель';
      case 5: return 'Май';
      case 6: return 'Июнь';
      case 7: return 'Июль';
      case 8: return 'Август';
      case 9: return 'Сентябрь';
      case 10: return 'Октябрь';
      case 11: return 'Ноябрь';
      case 12: return 'Декабрь';
    }
  }

  render(){

    const { showAddDialogAction, hideAddDialogAction } = this.props.appActions;
    const { showAddDialog } = this.props.currentStore;
    const { studentStore, currentStore } = this.props;
    const { setSource } = this.props.appActions;

    const setDialogTitle = () => {
      switch (currentStore.dialogType) {
        case 'add':
          return 'Добавить учащегося'
        case 'edit':
          return 'Редактирование данных'
        case 'show':
          return 'Информация о ' + studentStore.user.firstname + ' ' + studentStore.user.lastname
      }
    }

    return (
      <Modal show={ showAddDialog } onHide={ hideAddDialogAction }>
        <Modal.Header closeButton>
          <Modal.Title>{ setDialogTitle() }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Имя<small className="required">*</small></label>
                        <input type="text" defaultValue={ this.checkEditing() ? studentStore.user.firstname : '' } ref={(input) => { this.firstname = input }} name="firstname" className="form-control" placeholder="Иван"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Фамилия<small className="required">*</small></label>
                        <input type="text" defaultValue={ this.checkEditing() ? studentStore.user.lastname : '' } ref={(input) => { this.lastname = input }} name="lastname" className="form-control" placeholder="Иванов"/>
                    </div>
                </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                    <label>Номер телефона<small className="required">*</small></label>
                    <MaskedField value={ this.checkEditing() ? studentStore.user.phone : '' } mask="+7 (999) 999-99-99" name="phone" className="form-control" placeholder="+7 (999) 999-99-99" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="text" defaultValue={ this.checkEditing() ? studentStore.user.email : '' } ref={(input) => { this.email = input }} name="email" className="form-control" placeholder="ivanov@domain.ru"/>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Месяц<small className="required">*</small></label>
                  <Select
                      placeholder="Выберите месяц"
                      name="month"
                      searchable={false}
                      value={studentStore.monthsSelected}
                      options={studentStore.months}
                      onChange={this.handleSelectMonthChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Возраст<small className="required">*</small></label>
                        <input type="number" defaultValue={ this.checkEditing() ? studentStore.user.age : '' } ref={(input) => { this.age = input }} name="age" className="form-control" placeholder="18"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Предоплата<small className="required">*</small></label>
                        <input type="number" defaultValue={ this.checkEditing() ? studentStore.user.paid : '' } ref={(input) => { this.paid = input }} name="paid" className="form-control" placeholder="6000"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Посещает занятия? ( Нет / Да )</label>
                    <Switch checked={ this.checkEditing()  ? !!studentStore.user.visiting : !!studentStore.user.visiting } ref={ (node) => {this.visiting = node;}} />
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                      <label>Откуда узнал<small className="required">*</small></label>
                      <Select
                          multi={true}
                          searchable={true}
                          placeholder="Укажите источник"
                          name="ad_source"
                          searchable={false}
                          value={studentStore.sources}
                          options={studentStore.options}
                          onChange={this.handleSelectChange}
                      />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Цель</label>
                        <textarea rows="2" ref={(input) => { this.about = input }} name="about" defaultValue={ this.checkEditing() ? studentStore.user.about : '' } className="form-control"></textarea>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
          </form>
        </Modal.Body>
        {
          currentStore.dialogType != 'show' ? <Modal.Footer>
            <Button bsStyle="primary" onClick={ this.sendForm }>{ currentStore.dialogType == 'add' ? 'Добавить' : 'Изменить' }</Button>
            <Button bsStyle="default" onClick={ hideAddDialogAction }>Закрыть</Button>
          </Modal.Footer> : ''
        }
      </Modal>
    );
  }
}
