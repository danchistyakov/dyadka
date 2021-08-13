import { makeAutoObservable } from "mobx";
import AuthService from '../Components/Cabinet/services/AuthService';
import axios from 'axios';
import { API_URL } from "../Components/Cabinet/http";

class Auth {
    loading = false;
    user = {};
    isAuth = false;
    user = '';
    exists = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.loading = bool;
    }

    setStatus(bool) {
        this.exists = bool;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    async register(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout(email, password) {
        try {
            const response = await AuthService.logout(email, password);
            localStorage.removeItem('token', response.data.accessToken);
            this.setAuth(false);
            this.setUser({});
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    async checkUser(email) {
        this.setLoading(true);
        const response = await axios.post(`${API_URL}/checkuser`, { email });
        this.setStatus(response.data.exists);
        this.setLoading(false);
    }
}

export default new Auth()