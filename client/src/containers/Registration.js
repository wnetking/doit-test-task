import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Jumbotron, ControlLabel, Form, FormGroup, Col, FormControl, Button} from 'react-bootstrap'

class Registration extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let d = document;
    let {dispatch, data} = this.props;

    const userData = {
      'username': d.getElementById('formHorizontalName').value,
      'email': d.getElementById('formHorizontalEmail').value,
      'password': d.getElementById('formHorizontalPassword').value,
      'positions': data.positions
    }

    fetch('/user/registration', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userData)
    }).then(res => res.json()
    ).then(item => {
      dispatch.updateDataAction(item)

      if (item.login) {
        localStorage.setItem('user', item.user.name)
        localStorage.setItem('email', item.user.email)
      }
    });
  }

  render() {
    let {auth} = this.props;

    if (auth.login) {
      return (
        <Redirect to='/'/>
      )
    }

    return (
      <Jumbotron>
        <h1>Registration</h1>
        <p>Join to us and add new markers=)</p>
        <hr />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              User Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="User name" name="username" required/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" name="email" required/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" name="password" required/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Registration
              </Button>
              &nbsp;&nbsp;
              <Link className='btn btn-default btn-md' to='/login'>Sing In</Link>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default Registration;
