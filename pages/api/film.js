import axios from 'axios';

const Film = async (req, res) => {
    try {
        const film = (await axios.get(`http://f0561301.xsph.ru/details.php?id=${req.query.id}`)).data;
        res.status(200).json({ film });
    } catch (err) {
        res.status(500).send(err);
    }
}

export default Film