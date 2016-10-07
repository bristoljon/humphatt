import React from 'react';
import styles from './style';
import { InputGroup, Button } from '../../../widgets';

// const users = database.ref('users');
export default class RSVP extends React.Component {
  constructor(props) {
    super(props);
    const { email, name } = props.location.query;
    this.state = {
      email: email || '',
      pass: '',
      name: name || '',
      rsvp: 'Of course',
    };
  }
  onSignUp = () => {
    const { email, pass, name, rsvp } = this.state;
    this.props.actions.onUserSignUp(email, pass, rsvp, name);
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePass = (e) => {
    this.setState({
      pass: e.target.value,
    });
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeRSVP = (e) => {
    this.setState({
      rsvp: e.target.value,
    });
  }
  render() {
    console.log('RSVP', this.props);
    return (<div className={styles.signUp}>
      <h1>RSVP</h1>
      <InputGroup label="name:">
        <input type="text" onChange={this.onChangeName} value={this.state.name} />
      </InputGroup>
      <InputGroup label="email:">
        <input type="text" onChange={this.onChangeEmail} value={this.state.email} />
      </InputGroup>
      <InputGroup label="password:">
        <input type="password" onChange={this.onChangePass} value={this.state.pass} />
      </InputGroup>
      <InputGroup className={styles.attending} label="attending:">
        <Button className={styles.special}>Yes</Button>
        <Button>Maybe</Button>
        <Button>No</Button>
      </InputGroup>
      <p>
        <input type="button" onClick={this.onSignUp} value={'GO'} />
      </p>
      {this.props.user.error
        ? <p className={styles.validationError}>{this.props.user.error.message}</p>
        : null}
    </div>);
  }
}
