import {$auth} from "./ApiConfig";

export const checkAuth = async (): Promise<any> => {
    const {data} = await $auth.get(`/refresh`, {withCredentials: true});
    return data;
};

export const checkUser = async (email: string): Promise<any> => {
    const {data} = await $auth.post(`/checkuser`, {email});
    return data;
};

export const Register = async (payload) => {
    const {firstname, email, password} = payload;
    const {data} = await $auth.post(`/register`, {
        firstname,
        email,
        password
    }, {withCredentials: true});
    return data;
};

export const Login = async (email: string): Promise<any> => {
    const {data} = await $auth.post(`/login`, {email});
    return data;
};

export const Logout = async (): Promise<any> => {
    const {data} = await $auth.get(`/logout`, {withCredentials: true});
    return data;
};