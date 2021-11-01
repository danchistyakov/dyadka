import React, { useEffect } from "react";
import Auth from "../Store/Auth";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import AdminMenu from "../Components/Cabinet/AdminMenu";

const my = observer(() => {
  const router = useRouter();

  /*useEffect(() => {
    const Check = async () => {
      if (localStorage.getItem("token")) {
        await Auth.checkAuth();
      }
    };
    Check();
  }, []);

  useEffect(() => {
    if (!Auth.isAuth && !Auth.loading) {
      router.push("/auth");
    }
  }, [Auth.isAuth]);*/

  const Logout = async () => {
    await Auth.logout();
    router.push("/auth");
  };

  useEffect(() => {
    router.push("/my/favorites");
  }, []);

  if (Auth.isAuth) {
    return (
      <AdminMenu>
        <div>
          {/*Auth.isAuth
            ? `Пользователь авторизован ${Auth.user.email}`
          : "Пользователь не авторизован"*/}
          <button /*className={style.action_button}*/ onClick={Logout}>
            Выйти
          </button>
        </div>
      </AdminMenu>
    );
  } else {
    return <></>;
  }
});

export default my;
