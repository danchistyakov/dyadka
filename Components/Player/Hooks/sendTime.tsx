import axios from "axios";

const sendTime = async (
  email: string,
  id: number,
  season: number,
  episode: number,
  translation: number,
  quality,
  time
) => {
  const { data } = await axios.post(
    "http://localhost:5000/timestamp",
    {
      action: "add",
      email,
      id,
      season,
      episode,
      time,
      translation,
      quality: quality || 0,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};

export default sendTime;
