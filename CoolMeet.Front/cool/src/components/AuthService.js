import axios from "axios";
import decode from 'jwt-decode';
export default class AuthService{

    constructor(domain){
        this.domain = domain;
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getUserInformation = this.getUserInformation.bind(this);
    }

    getProfile() {
        return decode(this.getToken());
    }

    login(email, password){
        const request = {
            email: email,
            password: password
        }
        return axios.post(`${this.domain}/user/login`, request)
        .then(response => {
            console.log(response);
            this.setToken(response.data.token);
            this.setUserInformation(response.data.userInformation);
        })
        .catch(response => {
            console.log(response);
        });
    }

    getUserInformation(){
        return JSON.parse(localStorage.getItem('userInformation'));
    }

    setUserInformation(info){
        localStorage.setItem('userInformation', JSON.stringify(info));
    }

    loggedIn() {
        const token = this.getToken();
        return !!token;
    }

    getConfigForAuthorize(){             
        let authToken = this.getToken();
        const config = {
            headers: {'Authorization': `Bearer ${authToken}`}
          };
          return config;
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userInformation');
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }


}