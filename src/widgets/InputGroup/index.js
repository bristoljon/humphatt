import React from 'react';
import styles from './style';

export default function InputGroup(props) {
  return (<div className={styles.inputGroup}>
    <div className={styles.label}>{props.label}</div>
    {props.children}
  </div>);
};
