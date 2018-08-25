import { userConstants } from '../constants/userConstants';
import {store} from '../helpers/store'
const initialState = {loggedIn: false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
      };
    case userConstants.UPDATE_DATA:{
      const user = Object.assign(state.user, action.newData)
      return {
        loggedIn : state.loggedIn,
        user : Object.assign({}, user)
      }
    }
    default:
      return state
  }
}