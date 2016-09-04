import React from 'react';
// import styles from './style';
import { auth } from '../../firebase';
import Modal from '../../widgets/Modal';

// const users = database.ref('users');
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    };
  }
  onSignUp = () => {
    auth.createUserWithEmailAndPassword(this.state.user, this.state.pass)
      .then(response => {
        console.log('Great success', response);
        return auth.currentUser.updateProfile({
          displayName: 'Jon Wyatt',
        });
      })
      .then(() => { console.log('Updated'); })
      .catch(error => {
        console.log('Great Failure', error);
      });
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
    return (<Modal onClose={this.onCloseModal}>
      <h1>Sign Up</h1>
      e-mail:
      <input type="text" onChange={this.onChangeUser} value={this.state.user} />
      password:
      <input type="text" onChange={this.onChangePass} value={this.state.pass} />
      <input type="button" onClick={this.onSignUp} value={'GO'} />
    </Modal>);
  }
}
