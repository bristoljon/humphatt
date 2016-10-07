import React from 'react';
import styles from './style';

export default function Button(props) {
  return (<div className={`${styles.button} ${props.className ? props.className : ''}`} {...props} >
    {props.children}
  </div>);
}
