import axios from "axios";
import {BASE_URL} from '../components/constants';

export const authService = {
    logout,
    getToken,
    login
}

function logout(){
    localStorage.removeItem('token');
}

function getToken(){
    return localStorage.getItem('token');
}

function login(email, password){
    const request = {
        email: email,
        password: password
    }
    return axios.post(`${BASE_URL}/user/login`, request)
    .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data.userInformation;
    })
    .catch(response => {
        console.log(response);
    });
}