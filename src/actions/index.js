import ACTION from './actionTypes';
import { auth, database } from '../firebase';

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

export function userSignUp(email, pass, displayName, name) {
  return dispatch => {
    dispatch({
      type: ACTION.SIGN_UP,
      status: 'PENDING',
      creds: {
        email,
        pass,
        displayName,
        name,
      },
    });
    auth.createUserWithEmailAndPassword(email, pass)
      .then(response => {
        return database.ref('users/' + response.uid).set({
          displayName,
          name,
        });
      })
      .then(r => {
        dispatch({
          type: ACTION.SIGN_UP,
          status: 'SUCCESS',
        });
      })
      .catch(error => {
        console.log('error', error);
        dispatch({
          type: ACTION.SIGN_UP,
          status: 'FAILED',
          error: {
            code: error.code,
            message: error.message,
          },
        });
      });
  };
}

// Grab additional data from users/ after log in
function onUserLogIn(user) {
  return dispatch => {
    database.ref('users/' + user.uid).once('value', snapshot => {
      const data = snapshot.val();
      dispatch({
        type: ACTION.LOG_IN,
        status: 'SUCCESS',
        user: {
          email: user.email,
          displayName: data.displayName,
          name: data.name,
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
        dispatch(onUserLogIn(user));
      }
      else {
        dispatch({
          type: ACTION.LOG_OUT,
          status: 'SUCCESS',
        });
      }
    });
  };
}
