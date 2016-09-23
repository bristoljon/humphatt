import React from 'react';
import styles from './style';
import C from '../../constants';

export default class Header extends React.Component {
  signIn = () => {
    this.props.actions.onOpenModal(C.SIGNIN);
  }
  signUp = () => {
    this.props.actions.onOpenModal(C.SIGNUP);
  }
  signOut = () => {
    this.props.actions.onSignOut();
  }
  render() {
    const { user, status } = this.props;
    return (<div className={styles.header}>
      <h1>Danielle & Jon's Wedding</h1>
      <h2>{status.small ? 'Small' : 'Large'}</h2>
      <ul className={styles.menu}>
        <li>Info</li>
        <li>Wishlist</li>
        <li>Messages</li>
        <li onClick={user.loggedIn ? this.signOut : this.signIn}>
          {user.loggedIn ? 'Sign out' : 'Sign in'}
        </li>
        {!user.loggedIn ? <li onClick={this.signUp}>RSVP</li> : null}
      </ul>
    </div>);
  }
};
