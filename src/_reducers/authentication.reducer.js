import { userConstants } from '../_constants';

// eslint-disable-next-line no-undef
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user: ' ', token: ' ' } : {};

function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        // loggedIn: action.user.results,
        user: action.user,
        token: action.token,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        // loggedIn: action.user,
        user: action.user,
        token: action.user.results.token,
        isLogin: action.user.results.isLogin,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
      case userConstants.EMAIL_REQUEST:
        return{
          data:action.data
        }
      case userConstants.EMAIL_SUCCESS:
        return{
          data: action.data
        }
     case userConstants.EMAIL_FAILURE:
    return{
      data: action.error
    }
    case userConstants.EDIT_REQUEST:
      return{
        data: action.user
      }
    case userConstants.EDIT_SUCCESS:
      return{
        data:action.user
      }
    default:
      return state;
  }
}

export default authentication;
