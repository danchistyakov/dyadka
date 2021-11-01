import React, { useState } from "react";
import style from "../../styles/Cabinet/AuthPopup.module.sass";
import Auth from "../../Store/Auth";
import { observer } from "mobx-react-lite";
import Icons from "../../Images/Icons";

const AuthPopup = observer(({ setAuthPopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const Action = async () => {
    Auth.setMessage(null);
    if (!showpass) {
      await Auth.checkUser(email);
      if (!Auth.error) {
        setShowpass(true);
      }
    } else {
      if (Auth.registered) {
        await Auth.login(email, password);
        if (!Auth.error) {
          setAuthPopup(false);
        }
      } else {
        await Auth.register(firstname, email, password);
        if (!Auth.error) {
          setAuthPopup(false);
        }
      }
    }
  };

  const Close = () => {
    Auth.setError(null);
    setAuthPopup(false);
  };

  return (
    <div className={style.popup_wrapper} onClick={Close}>
      <div className={style.popup_section} onClick={(e) => e.stopPropagation()}>
        <Icons className={style.close_icon} icon="CloseIcon" onClick={Close} />
        <div className={style.popup_block}>
          <h1 className={style.auth_title}>
            {!showpass ? "Авторизация" : "Введите пароль"}
          </h1>
          {Auth.message && <p className={style.auth_message}>{Auth.message}</p>}
          <div className={style.auth_form}>
            <input
              autoComplete="email"
              value={email}
              className={`${style.auth_input}${
                Auth.error?.indexOf("mail") > -1 ? ` ${style.error}` : ""
              }`}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="E-mail"
            ></input>
            {showpass && !Auth.registered && (
              <input
                autoComplete="name"
                value={firstname}
                className={`${style.auth_input}${
                  Auth.error?.indexOf("мя") > -1 ? ` ${style.error}` : ""
                }`}
                onChange={(e) => setFirstname(e.target.value)}
                type="name"
                name="name"
                placeholder="Имя"
              ></input>
            )}
            <input
              autoComplete={
                Auth.registered ? "current-password" : "new-password"
              }
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
                className={`${style.action_button}${
                  email.length === 0 ? ` ${style.disabled}` : ""
                }`}
                onClick={Action}
                disabled={email.length === 0 ? true : false}
                //disabled={true}
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
        </div>
      </div>
    </div>
  );
});

export default AuthPopup;
