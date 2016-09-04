import ACTION from './actionTypes';
import { auth } from '../firebase';

function deviceWidthChange(small) {
  return {
    type: ACTION.DEVICE_WIDTH,
    small,
  };
};

export function openModal(modal) {
  return {
    type: ACTION.OPEN_MODAL,
    modal,
  };
}

export function closeModal() {
  return {
    type: ACTION.CLOSE_MODAL,
  };
}

export function userLogOut() {
  return dispatch => {
    dispatch({
      type: ACTION.LOG_OUT,
      status: 'PENDING',
    });
    auth.signOut()
      .then(r => {
        dispatch({
          type: ACTION.LOG_OUT,
          status: 'SUCCESS',
        });
      })
      .catch(error => {
        dispatch({
          type: ACTION.LOG_IN,
          status: 'FAILED',
          error: {
            code: error.code,
            message: error.message,
          },
        });
      });
  };
}

export function userLogIn(email, pass) {
  return dispatch => {
    dispatch({
      type: ACTION.LOG_IN,
      status: 'PENDING',
      creds: {
        email,
        pass,
      },
    });
    auth.signInWithEmailAndPassword(email, pass)
      .then(r => {
        dispatch({
          type: ACTION.LOG_IN,
          status: 'SUCCESS',
        });
      })
      .catch(error => {
        dispatch({
          type: ACTION.LOG_IN,
          status: 'FAILED',
          error: {
            code: error.code,
            message: error.message,
          },
        });
      });
  };
}

export function initialise() {
  return dispatch => {
    dispatch(deviceWidthChange(window.innerWidth < 640));
    const mql = window.matchMedia('(min-width: 640px)');
    mql.addListener(e => {
      dispatch(deviceWidthChange(!e.matches));
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: ACTION.LOG_IN,
          status: 'SUCCESS',
          user: {
            displayName: user.displayName,
            email: user.email,
          },
        });
      } else {
        dispatch({
          type: ACTION.LOG_OUT,
          status: 'SUCCESS',
        });
      }
    });
  };
}
