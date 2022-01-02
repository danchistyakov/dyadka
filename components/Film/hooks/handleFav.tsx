import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Auth from "../../../Store/Auth";

interface handleFavProps {
  id: number;
  kp_id: number;
  title: string;
  slug: string;
  isFavorite: boolean;
  setAuthPopup: Dispatch<SetStateAction<boolean>>;
  setFavorite: Dispatch<SetStateAction<boolean>>;
}

const handleFav = async (
  { id, kp_id, title, slug }: handleFavProps,
  isFavorite,
  setAuthPopup,
  setFavorite
) => {
  if (!Auth.isAuth) {
    return setAuthPopup(true);
  }

  if (!isFavorite) {
    const { data } = await axios.post(
      `${process.env.API_URL}/favorites`,
      {
        action: "add",
        email: "4i.danila@gmail.com",
        id,
        poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp_id}.jpg`,
        title,
        slug,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (data.success) {
      setFavorite(true);
    }
  } else if (isFavorite) {
    const { data } = await axios.post(
      `${process.env.API_URL}/favorites`,
      {
        action: "remove",
        email: "4i.danila@gmail.com",
        id: id,
        poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp_id}.jpg`,
        title: title,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (data.success) {
      setFavorite(false);
    }
  }
};

export default handleFav;