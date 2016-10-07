import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  initialise,
  userLogOut,
  userLogIn,
  openModal,
  closeModal,
  userSignUp } from '../actions';

const mapStateToProps = (state) => {
  return  {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      initialise: () => dispatch(initialise(location)),
      onSignOut: () => dispatch(userLogOut()),
      onSignIn: (email, pass) => dispatch(userLogIn(email, pass)),
      onOpenModal: (modal) => dispatch(openModal(modal)),
      onCloseModal: () => dispatch(closeModal()),
      onUserSignUp: (email, pass, name) => dispatch(userSignUp(email, pass, name)),
    },
  };
};

const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Root;
