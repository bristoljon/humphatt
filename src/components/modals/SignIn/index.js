import React from 'react';
// import styles from './style';

// const users = database.ref('users');
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    };
  }
  onSignIn = () => {
    this.props.actions.onSignIn(this.state.user, this.state.pass);
  }
  onChangeUser = (e) => {
    this.setState({
      user: e.target.value,
    });
  }
  onChangePass = (e) => {
    this.setState({
      pass: e.target.value,
    });
  }
  render() {
    console.log('props', this.props);
    const { user } = this.props;
    return (<div>
      <h1>Sign In</h1>
      e-mail:
      <input type="text" onChange={this.onChangeUser} value={this.state.user} />
      password:
      <input type="password" onChange={this.onChangePass} value={this.state.pass} />
      <input type="button" onClick={this.onSignIn} value={'GO'} />
      <p>{user.error ? user.error.message : null}</p>
    </div>);
  }
}
