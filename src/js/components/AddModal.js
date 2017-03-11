import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger } from 'react-bootstrap'
import { Radio, RadioGroup } from 'react-icheck'
import Select from 'react-select'
import MaskedField from 'react-masked-field'
import 'whatwg-fetch'

import { fetchz, fetchPOST } from '../helpers'

export default class Content extends Component {

  constructor(props){
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.userGenerate = this.userGenerate.bind(this);

    // setTimeout(function(){
    //   const { studentStore } = this.props;
    //   const { setSource } = this.props.appActions;
    //   if (this.checkEditing()) {
    //     const sources = JSON.parse(studentStore.user.sources);
    //     setSource( sources.length ? sources : [] );
    //   }
    // });

  }

  checkEditing() {
    const { currentStore } = this.props;
    return currentStore.dialogType == 'edit' ? true : false;
  }

  userGenerate(){
    const { studentStore } = this.props;
    return {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      age: this.age.value,
      phone: document.querySelector('[name="phone"]').value,
      email: this.email.value,
      experience: !this.radio.state.value ? 0 : this.radio.state.value,
      sources: JSON.stringify(studentStore.sources),
      about: this.about.value,
      paid: this.paid.value
    }
  }

  handleSelectChange(items) {
    const { setSource, setUser } = this.props.appActions;
    setSource(items);
    setUser(this.userGenerate());
  }

  handleCheckbox(e, checked){
    const { setUser } = this.props.appActions;
    setUser(this.userGenerate());
  }

  errorInput(name, b = true){
    if (b)
      document.querySelector('[name="'+ name +'"]').classList.add('error');
    else
      document.querySelector('[name="'+ name +'"]').classList.remove('error');
  }

  sendForm(){
    const { setUser, setUsers } = this.props.appActions;
    const user = this.userGenerate();
    setUser(user);

    console.log('user info = ', user);

    document.querySelectorAll('.form-group input').forEach( (item) => item.classList.remove('error') );

    if ( user.firstname.length < 3 || !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(user.firstname) ) {
      this.errorInput('firstname');
    }

    if ( user.lastname.length < 3 || !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(user.lastname) ) {
      this.errorInput('lastname');
    }

    if ( !user.age || user.age <= 0 ) this.errorInput('age');

    if ( !user.phone || !/^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/.test(user.phone) ) this.errorInput('phone');

    if ( !/^\d+$/.test(user.paid) ) this.errorInput('paid');

    if (document.querySelectorAll('.form-group input.error').length) {
      return false;
    }

    fetchPOST('/users/add', user, function(json){
      setUsers(json);
    });
  }

  render(){

    const { showAddDialogAction, hideAddDialogAction } = this.props.appActions;
    const { showAddDialog } = this.props.currentStore;
    const { studentStore, currentStore } = this.props;
    const { setSource } = this.props.appActions;

    return (
      <Modal show={ showAddDialog } onHide={ hideAddDialogAction }>
        <Modal.Header closeButton>
          <Modal.Title>Добавить пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Имя<small className="required">*</small></label>
                        <input type="text" value={ this.checkEditing() ? studentStore.user.firstname : '' } ref={(input) => { this.firstname = input }} name="firstname" className="form-control" placeholder="Иван"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Фамилия<small className="required">*</small></label>
                        <input type="text" value={ this.checkEditing() ? studentStore.user.lastname : '' } ref={(input) => { this.lastname = input }} name="lastname" className="form-control" placeholder="Иванов"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Возраст<small className="required">*</small></label>
                        <input type="number" value={ this.checkEditing() ? studentStore.user.age : '' } ref={(input) => { this.age = input }} name="age" className="form-control" placeholder="18"/>
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
                        <input type="text" value={ this.checkEditing() ? studentStore.user.email : '' } ref={(input) => { this.email = input }} name="email" className="form-control" placeholder="ivanov@domain.ru"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Предоплата<small className="required">*</small></label>
                        <input type="number" value={ this.checkEditing() ? studentStore.user.paid : '' } ref={(input) => { this.paid = input }} name="paid" className="form-control" placeholder="6000"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <div className="form-group">
                      <label>Опыт разработки</label>
                      <RadioGroup
                        onChange={this.handleCheckbox}
                        name="dev_experience"
                        ref={(radio) => { this.radio = radio }}
                        >

                        <Radio
                          value="1"
                          radioClass="iradio_square-blue"
                          label="Есть"
                        />
                        <Radio
                          value="0"
                          radioClass="iradio_square-blue"
                          label="Нет"
                        />

                      </RadioGroup>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="form-group">
                      <label>Откуда узнал<small className="required">*</small></label>
                        <Select
                            multi
                            placeholder="Укажите источник"
                            name="ad_source"
                            searchable={false}
                            value={this.checkEditing() ? studentStore.user.sources : studentStore.sources}
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
                        <textarea rows="5" ref={(input) => { this.about = input }} name="about" className="form-control">{ this.checkEditing() ? studentStore.user.about : '' }</textarea>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={ this.sendForm }>Добавить</Button>
          <Button bsStyle="default" onClick={ hideAddDialogAction }>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
