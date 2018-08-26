import { userConstants } from '../constants/userConstants';
import {store} from '../helpers/store'
const initialState = {loggedIn: false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: Object.assign({}, action.user)
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: Object.assign({}, action.user)
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
        loggedIn : Object.assign({}, state.loggedIn),
        user : Object.assign({}, user)
      }
    }
    case userConstants.UPDATE_PHOTO:{
      const newObj = Object.assign({}, state.user)
      newObj.photoUrl = `${state.user.photoUrl}?${Date.now()}`
      return{
        loggedIn : Object.assign({}, state.loggedIn),
        user : newObj
      }
    }
    default:
      return state
  }
}