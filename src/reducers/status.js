import ACTION from '../actions/actionTypes';
const initialState = {
  small: false,
  loading: false,
  modal: null,
};

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
  case ACTION.SIGN_UP:
  case ACTION.LOG_IN:
    switch (action.status) {
    case 'PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        modal: null,
        loading: false,
      };
    case 'FAILED':
      return {
        ...state,
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
        loading: false,
      };
    case 'FAILED':
      return {
        ...state,
        loading: false,
      };
    }
    break;
  default:
    return state;
  }
}
