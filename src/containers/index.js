import React from 'react';
import Home from '../components/Home';

export default class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small: false,
    }
  }
  componentWillMount = () => {
    const mql = window.matchMedia(`(min-width: 640px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      small: mql.matches
    });
  }
  mediaQueryChanged = (e) => {
    this.setState({
      small: !e.matches
    });
  }
  render() {
    return <Home small={this.state.small}/>
  }

}
