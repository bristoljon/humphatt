import React from 'react';
import styles from './style';

const Home = (props) => {
  console.log(props);
  return <div className={styles.main}>
    <div className={styles.wrap}>
      <main className={styles.body}>
        <h1>{props.small ? 'Small' : 'Large'}</h1>
      </main>
    </div>
  </div>;
};

Home.displayName = 'Home';

export default Home;
