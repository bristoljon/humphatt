import React from 'react';
import styles from './style';
import { modals } from './mapping';

export default class Modal extends React.Component {

  render() {
    const { modal, onClose } = this.props;
    if (!modal) return null;
    const Modal = modals[modal];
    return (<div className={styles.modal}>
      <div className={styles.modalContent}>
        <input className={styles.close} type="button" value={'X'} onClick={onClose} />
        <Modal {...this.props} />
      </div>
    </div>);
  }
};
