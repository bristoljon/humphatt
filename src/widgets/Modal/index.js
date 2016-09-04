import React from 'react';
import styles from './style';

export default function Modal(props) {
  return (<div className={styles.modal}>
    <div className={styles.modalContent}>
      <input className={styles.close} type="button" value={'X'} onClick={props.onClose} />
      {props.children}
    </div>
  </div>);
};
