import {auth, root} from "@models/Root";
import {checkAuth, checkUser, Login, Logout, Register} from "@shared/api/Auth";

export const checkAuthFx = auth.createEffect<any, any, Error>(checkAuth);
export const checkUserFx = auth.createEffect<any, any, Error>(checkUser);
export const loginFx = auth.createEffect<any, any, Error>(Login);
export const logoutFx = auth.createEffect<any, any, Error>(Logout);
export const registerFx = auth.createEffect<any, any, Error>(Register);

export const $user = auth.createStore<any | null>(null);