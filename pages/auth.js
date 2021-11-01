import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Auth from "../Store/Auth";
import style from "../styles/Auth.module.sass";
import { useRouter } from "next/router";

const LoginForm = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screen, setScreen] = useState(1);
  const [showpass, setShowpass] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const Check = async () => {
      if (localStorage.getItem("token")) {
        await Auth.checkAuth();
      }
    };
    Check();
    Auth.setLoading(false);
  }, []);

  /*useEffect(() => {
    if (Auth.isAuth) {
      router.push("/my/favorites");
    }
  }, [Auth.isAuth]);*/

  const Action = async () => {
    if (!showpass) {
      await Auth.checkUser(email);
      if (!Auth.error) {
        setShowpass(true);
      }
    } else {
      if (Auth.registered) {
        Auth.login(email, password);
        router.push("/my");
      } else {
        Auth.register(email, password);
      }
    }
  };

  if (!Auth.isAuth) {
    if (!Auth.loading) {
      return (
        <section className={style.auth_section}>
          <h1 className={style.auth_title}>
            {screen === 1 ? "Вход | Регистрация (beta)" : "Введите пароль"}
          </h1>
          <div className={style.auth_form}>
            <input
              /*autoComplete='email' style={{
                display: screen === 1 ? "block" : "none",
              }}*/
              value={email}
              className={`${style.auth_input}${
                Auth.error?.indexOf("mail") > -1 ? ` ${style.error}` : ""
              }`}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="E-mail"
            ></input>
            <input
              autoComplete={Auth.exists ? "current-password" : "new-password"}
              style={{ display: showpass ? "block" : "none" }}
              value={password}
              className={`${style.auth_input}${
                Auth.error?.indexOf("арол") > -1 ? ` ${style.error}` : ""
              }`}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Пароль, не менее 6 символов"
            ></input>
            <p className={style.auth_error}>{Auth.error}</p>
            {!showpass ? (
              <button
                type="submit"
                className={`${style.action_button}${
                  email.length === 0 ? ` ${style.disabled}` : ""
                }`}
                onClick={Action}
                disabled={email.length === 0 ? true : false}
              >
                Далее
              </button>
            ) : (
              <button
                type="submit"
                className={style.action_button}
                onClick={Action}
              >
                {Auth.registered ? "Войти" : "Зарегистрироваться"}
              </button>
            )}
          </div>
        </section>
      );
    } else {
      return <section className={style.auth_section}></section>;
    }
  } else {
    return <></>;
  }
});

export default LoginForm;
