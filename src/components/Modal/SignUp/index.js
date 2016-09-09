import React from 'react';
// import styles from './style';

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
    this.props.onUserSignUp(email, pass, displayName, name);
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
    return (<div>
      <h1>Sign Up</h1>
      <p>
        name:
        <input type="text" onChange={this.onChangeName} value={this.state.name} />
      </p>
      <p>
        display name:
        <input type="text" onChange={this.onChangeDisplayName} value={this.state.displayName} />
      </p>
      <p>
        e-mail:
        <input type="text" onChange={this.onChangeEmail} value={this.state.email} />
      </p>
      <p>
        password:
        <input type="password" onChange={this.onChangePass} value={this.state.pass} />
      </p>
      <p>
        <input type="button" onClick={this.onSignUp} value={'GO'} />
      </p>
    </div>);
  }
}
