import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Cabinet/AdminMenu";
import { useRouter } from "next/router";
import Auth from "../../store/Auth";
import { observer } from "mobx-react-lite";
import style from "../../styles/Cabinet/Settings.module.sass";

const Settings = observer(() => {
  /*const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!Auth.isAuth && !Auth.loading) {
      router.push("/auth");
    }
  }, [Auth.isAuth]);

  useEffect(() => {
    setEmail(Auth.user.email);
  }, [Auth.user.email]);

  useEffect(() => {
    if (
      email === Auth.user.email ||
      name?.length === 0 ||
      email?.length === 0 name === Auth.user.name
    ) {
      console.log("Enable");
      setDisabled(true);
    } else {
      console.log("Disable");
      setDisabled(false);
    }
  }, [name, email, Auth.user.email]);

  console.log(name?.length === 0 && email?.length === 0);*/
  return (
    <AdminMenu>
      {/*<h1 className={style.title}>Настройки</h1>
            <div>
                <input className={style.settings_input} onChange={(e) => setName(e.target.value)} placeholder='Имя'></input>
                <input className={style.settings_input} defaultValue={Auth.user.email} onChange={(e) => setEmail(e.target.value)} placeholder={'E-mail'}></input>
                <button className={style.settings_save} disabled={disabled}>Сохранить</button>
    </div>*/}
      <h1 style={{ fontSize: "17px" }}>
        Данный раздел находится в разработке...
      </h1>
    </AdminMenu>
  );
});

export default Settings;
