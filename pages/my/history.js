import React, { useEffect } from "react";
import AdminMenu from "../../Components/Cabinet/AdminMenu";
import { useRouter } from "next/router";
import Auth from "../../Store/Auth";
import { observer } from "mobx-react-lite";

const History = () => {
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

export default History;
