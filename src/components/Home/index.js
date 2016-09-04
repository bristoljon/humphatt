import React from 'react';
import styles from './style';
import MODALS from '../../constants';

export default class Home extends React.Component {
  componentWillMount = () => {
    this.props.initialise();
  }
  signIn = () => {
    console.log('signin');
    this.props.onOpenModal('SIGNIN');
  }
  signUp = () => {
    console.log('signup');
    this.props.onOpenModal('SIGNUP');
  }
  render() {
    const props = this.props;
    const Modal = MODALS[props.modal];
    console.log('Home.props', props);
    console.log('MODAL', MODALS);
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
        {props.modal ? <Modal {...props} /> : null}
      </div>
    </div>);
  }
};
