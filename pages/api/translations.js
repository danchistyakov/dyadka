import axios from 'axios';
import cheerio from 'cheerio';

const Translations = async (req, res) => {
    const rezkatranslate = (await axios.get(`http://f0561301.xsph.ru/?id=${req.query.id}`)).data;
    const selector = cheerio.load(rezkatranslate);
    const translations = selector('.b-translator__item').map((i, x) => (
        { id: selector(x).attr('data-translator_id'), name: selector(x).attr('title') }
    )).toArray();
    res.status(200).json({ translations: translations });

}

export default Translations