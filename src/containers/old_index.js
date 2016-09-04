import React from 'react';
import Home from '../components/Home';
import { auth } from '../firebase';

export default class Root extends React.Component {
  componentWillMount = () => {
    // Responsive breakpoint
    const mql = window.matchMedia('(min-width: 640px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      small: window.innerWidth < 640,
    });
    // Firebase
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({
          user: user,
        });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }
  mediaQueryChanged = (e) => {
    this.setState({
      small: !e.matches,
    });
  }
  render() {
    return <Home {...this.state}/>;
  }

}
