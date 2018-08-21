import { userConstants } from '../constants/userConstants';
import {authService} from '../services/AuthService';
import { alertActions } from './alertActions';
import { history } from '../helpers/history';
export const userActions = {
    login,
    logout
};
 
function login(email, password) {
    return dispatch => {
        authService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/events');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
 
function logout() {
    authService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}