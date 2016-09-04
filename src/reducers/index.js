import initialState from './initialState';
import ACTION from '../actions/actionTypes';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.DEVICE_WIDTH:
      return {
        ...state,
        small: action.small,
      };
    case ACTION.OPEN_MODAL:
      return {
        ...state,
        modal: action.modal,
      };
    case ACTION.CLOSE_MODAL:
      return {
        ...state,
        modal: null,
      };
    case ACTION.LOG_IN:
      switch (action.status) {
        case 'PENDING':
          return {
            ...state,
            user: {
              ...state.user,
              loggedIn: false,
              email: action.creds.email,
              pass: action.creds.pass,
              error: null,
            },
            loading: true,
          };
        case 'SUCCESS':
          return {
            ...state,
            modal: null,
            user: {
              ...state.user,
              loggedIn: true,
              displayName: action.user.displayName,
              email: action.user.email,
              error: null,
            },
            loading: false,
          };
        case 'FAILED':
          return {
            ...state,
            user: {
              ...state.user,
              loggedIn: false,
              error: action.error,
            },
            loading: false,
          };
      }
      break;
    case ACTION.LOG_OUT:
      switch (action.status) {
        case 'PENDING':
          return {
            ...state,
            loading: true,
          };
        case 'SUCCESS':
          return {
            ...state,
            modal: 'SIGNIN',
            user: {
              ...state.user,
              loggedIn: false,
              displayName: '',
              email: '',
              error: null,
            },
            loading: false,
          };
        case 'FAILED':
          return {
            ...state,
            user: {
              ...state.user,
              loggedIn: true,
              error: action.error,
            },
            loading: false,
          };
      }
      break;
    default:
      return state;
  }
}
