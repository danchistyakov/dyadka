import React, { useEffect } from "react";
import AdminMenu from "../../components/Cabinet/AdminMenu";
import { useRouter } from "next/router";
import Auth from "../../store/Auth";
import { observer } from "mobx-react-lite";

const Health = () => {
  const router = useRouter();

  useEffect(() => {
    if (!Auth.isAuth && !Auth.loading) {
      router.push("/auth");
    }
  }, [Auth.isAuth]);

  return (
    <AdminMenu>
      <h1 style={{ fontSize: "17px" }}>
        Данный раздел находится в разработке...
      </h1>
    </AdminMenu>
  );
};

export default Health;
