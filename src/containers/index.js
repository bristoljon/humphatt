import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  initialise,
  userLogOut,
  userLogIn,
  openModal,
  closeModal } from '../actions';

const mapStateToProps = (state) => {
  return  {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialise: () => dispatch(initialise()),
    onSignOut: () => dispatch(userLogOut()),
    onSignIn: (email, pass) => dispatch(userLogIn(email, pass)),
    onOpenModal: (modal) => dispatch(openModal(modal)),
    onCloseModal: () => dispatch(closeModal()),
  };
};

const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Root;
