import React from 'react';
import styles from './style';
import C from '../../constants';
import Modal from '../Modal';

export default class Home extends React.Component {
  componentWillMount = () => {
    this.props.initialise();
  }
  signIn = () => {
    this.props.onOpenModal(C.SIGNIN);
  }
  signUp = () => {
    this.props.onOpenModal(C.SIGNUP);
  }
  render() {
    const props = this.props;
    return (<div className={styles.main}>
      <div className={`${styles.wrap} ${props.small ? 'mobile' : ''}`}>
        <div className={styles.body}>
          <h1>{props.small ? 'Small' : 'Large'}</h1>
          <h1>{props.user.loggedIn ? props.user.displayName || props.user.email : null}</h1>
          <input
            type="button"
            value={props.user.loggedIn ? 'Sign out' : 'Sign in'}
            onClick={props.user.loggedIn ? props.onSignOut : this.signIn}
          />
          <input
            type="button"
            value="Sign Up"
            onClick={this.signUp}
          />
        </div>
        <Modal
          modal={props.status.modal}
          onClose={props.onCloseModal}
          user={props.user}/>
      </div>
    </div>);
  }
};
