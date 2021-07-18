import axios from 'axios';

const Details = async (req, res) => {
    const details = (await axios.get(`https://d.appinfo.tk/kp/film/${req.query.id}`)).data;
    res.status(200).json({ details: details });
}

export default Details