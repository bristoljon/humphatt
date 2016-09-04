import React from 'react';
import styles from './style';
import MODALS from '../../constants';

export default class Home extends React.Component {
  componentWillMount = () => {
    this.props.initialise();
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
          <input type="button" value="Sign out" onClick={props.onSignOut} />
        </div>
        {props.modal ? <Modal {...props} /> : null}
      </div>
    </div>);
  }
};
