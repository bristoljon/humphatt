import React from 'react';
import styles from './style';
import { modals } from './mapping';

export default class Modal extends React.Component {

  render() {
    const { actions, status } = this.props;
    if (!status.modal) return null;
    const Modal = modals[status.modal];
    return (<div className={styles.modal}>
      <div className={styles.modalContent}>
        <input className={styles.close} type="button" value={'X'} onClick={actions.onCloseModal} />
        <Modal {...this.props} />
      </div>
    </div>);
  }
};
