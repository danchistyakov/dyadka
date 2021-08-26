import React, { useState } from "react";
import style from "../../styles/Cabinet/AuthPopup.module.sass";
import Auth from "../../Store/Auth";
import { observer } from "mobx-react-lite";
import Icons from "../../Images/Icons";

const AuthPopup = observer(({ setAuthError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screen, setScreen] = useState(1);
  const [error, setError] = useState("");

  const Action = async () => {
    if (screen === 1) {
      await Auth.checkUser(email);
      setScreen(2);
    }

    if (screen === 2) {
      Auth.exists
        ? Auth.login(email, password)
        : Auth.register(email, password);
    }
  };
  return (
    <div className={style.popup_wrapper} onClick={() => setAuthError(false)}>
      <div className={style.popup_section} onClick={(e) => e.stopPropagation()}>
        <Icons
          className={style.close_icon}
          icon="CloseIcon"
          onClick={() => setAuthError(false)}
        />
        <div className={style.popup_block}>
          <h1 className={style.auth_title}>
            {screen === 1
              ? "Для продолжения необходима авторизация!"
              : "Введите пароль"}
          </h1>
          <div className={style.auth_form}>
            {console.log(Auth.exists)}
            <input
              /*autoComplete='email'*/ style={{
                display: screen === 1 ? "block" : "none",
              }}
              value={email}
              className={style.auth_input}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="E-mail"
            ></input>
            <input
              autoComplete={Auth.exists ? "current-password" : "new-password"}
              style={{ display: screen === 2 ? "block" : "none" }}
              value={password}
              className={style.auth_input}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Пароль"
            ></input>
            {screen === 1 ? (
              <button
                type="submit"
                /*className={`${style.action_button}${
                  email.length === 0 ? ` ${style.disabled}` : ""
                }`}*/
                className={`${style.action_button} ${style.disabled}`}
                onClick={Action}
                //disabled={email.length === 0 ? true : false}
                disabled={true}
              >
                Скоро!
              </button>
            ) : (
              <button
                type="submit"
                className={style.action_button}
                onClick={Action}
              >
                {Auth.exists ? "Войти" : "Зарегистрироваться"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthPopup;
