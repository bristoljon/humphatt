import React from 'react';
// import styles from './style';
import Modal from '../../widgets/Modal';

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
    this.props.onSignIn(this.state.user, this.state.pass);
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
    console.log('SignIn.props', this.props);
    const { props } = this;
    return (<Modal onClose={props.onCloseModal}>
      <h1>Sign In</h1>
      e-mail:
      <input type="text" onChange={this.onChangeUser} value={this.state.user} />
      password:
      <input type="text" onChange={this.onChangePass} value={this.state.pass} />
      <input type="button" onClick={this.onSignIn} value={'GO'} />
      <p>{props.user.error ? props.user.error.message : null}</p>
    </Modal>);
  }
}
