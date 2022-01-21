import { FC, useState, Dispatch, SetStateAction } from "react";
import styles from "../../styles/Cabinet/AuthPopup.module.scss";
import Auth from "../../store/Auth";
import { observer } from "mobx-react-lite";
import Icons from "../../Images/Icons";

interface AuthPopupProps {
  setAuthPopup: Dispatch<SetStateAction<boolean>>;
}

const AuthPopup: FC<AuthPopupProps> = observer(({ setAuthPopup }) => {
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
    <div className={styles.popup_wrapper} onClick={Close}>
      <div
        className={styles.popup_section}
        onClick={(e) => e.stopPropagation()}
      >
        <Icons className={styles.close_icon} icon="CloseIcon" onClick={Close} />
        <div className={styles.popup_block}>
          <h1 className={styles.auth_title}>
            {!showpass ? "Авторизация" : "Введите пароль"}
          </h1>
          {Auth.message && (
            <p className={styles.auth_message}>{Auth.message}</p>
          )}
          <div className={styles.auth_form}>
            <input
              autoComplete="email"
              value={email}
              className={`${styles.auth_input}${
                Auth.error?.indexOf("mail") > -1 ? ` ${styles.error}` : ""
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
                className={`${styles.auth_input}${
                  Auth.error?.indexOf("мя") > -1 ? ` ${styles.error}` : ""
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
              className={`${styles.auth_input}${
                Auth.error?.indexOf("арол") > -1 ? ` ${styles.error}` : ""
              }`}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Пароль, не менее 6 символов"
            ></input>
            <p className={styles.auth_error}>{Auth.error}</p>
            {!showpass ? (
              <button
                className={`${styles.action_button}${
                  email.length === 0 ? ` ${styles.disabled}` : ""
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
                className={styles.action_button}
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
