import React from 'react';
import styles from './style';
import InputGroup from '../../../widgets/InputGroup';

// const users = database.ref('users');
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      displayName: '',
      name: '',
    };
  }
  onSignUp = () => {
    const { email, pass, name, displayName } = this.state;
    this.props.actions.onUserSignUp(email, pass, displayName, name);
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
  onChangeDisplayName = (e) => {
    this.setState({
      displayName: e.target.value,
    });
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }
  render() {
    return (<div className={styles.signUp}>
      <h1>RSVP</h1>
      <InputGroup label="name:">
        <input type="text" onChange={this.onChangeName} value={this.state.name} />
      </InputGroup>
      <InputGroup label="display name:">
        <input type="text" onChange={this.onChangeDisplayName} value={this.state.displayName} />
      </InputGroup>
      <InputGroup label="email:">
        <input type="text" onChange={this.onChangeEmail} value={this.state.email} />
      </InputGroup>
      <InputGroup label="password:">
        <input type="password" onChange={this.onChangePass} value={this.state.pass} />
      </InputGroup>
      <p>
        <input type="button" onClick={this.onSignUp} value={'GO'} />
      </p>
    </div>);
  }
}
