import ACTION from '../actions/actionTypes';
const initialState = {
  displayName: '',
  email: '',
  error: null,
  loggedIn: false,
  pass: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ACTION.SIGN_UP:
    switch (action.status) {
    case 'PENDING':
      return {
        ...state,
        loggedIn: false,
        email: action.creds.email,
        pass: action.creds.pass,
        error: null,
      };
    case 'SUCCESS':
      return {
        ...state,
      };
    case 'FAILED':
      return {
        ...state,
        loggedIn: false,
        error: action.error,
      };
    }
    break;
  case ACTION.LOG_IN:
    switch (action.status) {
    case 'PENDING':
      return {
        ...state,
        loggedIn: false,
        email: action.creds.email,
        pass: action.creds.pass,
        error: null,
      };
    case 'SUCCESS':
      return {
        ...state,
        loggedIn: true,
        displayName: action.user.displayName,
        email: action.user.email,
        name: action.user.name,
        error: null,
      };
    case 'FAILED':
      return {
        ...state,
        loggedIn: false,
        error: action.error,
      };
    }
    break;
  case ACTION.LOG_OUT:
    switch (action.status) {
    case 'PENDING':
      return {
        ...state,
      };
    case 'SUCCESS':
      return {
        ...state,
        loggedIn: false,
        displayName: '',
        email: '',
        error: null,
      };
    case 'FAILED':
      return {
        ...state,
        loggedIn: true,
        error: action.error,
      };
    }
    break;
  default:
    return state;
  }
}
