import React from 'react';
import styles from './style';
import Modal from '../Modal';
import Header from '../Header';
import Poem from '../Poem';

export default class Home extends React.Component {
  componentWillMount = () => {
    console.log('Home', this.props);
    this.props.actions.initialise(this.props.location);
  }
  render() {
    return (<div className={styles.main}>
      <div className={`${styles.wrap} ${status.small ? 'mobile' : ''}`}>
        <div className={styles.body}>
          <Header {...this.props} />
          <Poem />
        </div>
        <Modal {...this.props} />
      </div>
    </div>);
  }
};
