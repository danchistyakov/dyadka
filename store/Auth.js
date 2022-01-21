import { makeAutoObservable } from "mobx";
import axios from "axios";

class Auth {
  loading = true;
  user = {};
  isAuth = false;
  registered = null;
  error = null;
  title = "Авторизация";
  message = null;

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
    this.registered = bool;
  }

  setError(error) {
    this.error = error;
  }

  setTitle(title) {
    this.title = title;
  }

  setMessage(message) {
    this.message = message;
  }

  async login(email, password) {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("token", data.accessToken);
        this.setAuth(true);
        this.setUser(data.user);
        this.setError(null);
      } else {
        this.setError(data.message);
      }
    } catch (err) {
      this.setError(err.response?.data?.message);
    }
  }

  async register(firstname, email, password) {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/register`,
        { firstname, email, password },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        this.setError(null);
        this.setMessage(data.message);
      } else {
        this.setError(data.message);
      }
    } catch (err) {
      this.setError(err.response?.data?.message);
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        localStorage.removeItem("token", data.accessToken);
        this.setAuth(false);
        this.setUser({});
        this.setError(null);
      } else {
        this.setError(data.message);
      }
    } catch (err) {
      this.setError(err.response?.data?.message);
    }
    this.setLoading(false);
  }

  async checkAuth() {
    try {
      const { data } = await axios.get(`http://localhost:5000/refresh`, {
        withCredentials: true,
      });
      if (data.success) {
        localStorage.setItem("token", data.accessToken);
        this.setAuth(true);
        this.setUser(data.user);
        this.setLoading(false);
        this.setError(null);
      } else {
        this.setError(data.message);
      }
    } catch (err) {
      //this.setError(err.response?.data?.message);
    }
  }

  async checkUser(email) {
    try {
      //this.setLoading(true);
      const { data } = await axios.post(`http://localhost:5000/checkuser`, {
        email,
      });
      if (data.success) {
        this.setStatus(data.registered);
        this.setLoading(false);
        this.setError(null);
      }
    } catch (err) {
      this.setLoading(false);
      this.setError(err.response?.data?.message);
    }
  }
}

export default new Auth();
