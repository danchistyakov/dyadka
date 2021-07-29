import axios from 'axios';

const Film = async (req, res) => {
    try {
        const film = (await axios.get(`https://d.appinfo.ml/ref/40/${req.query.id}`)).data;
        res.status(200).json({ film });
    } catch (err) {
        res.status(500).send(err);
    }
}

export default Film