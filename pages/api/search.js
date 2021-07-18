import axios from 'axios';
import cheerio from 'cheerio';

const Search = async (req, res) => {
    try {
        const search = (await axios.get(`http://f0561301.xsph.ru/search.php?q=${encodeURIComponent(req.query.q)}`)).data

        const selector = cheerio.load(search);

        const titles = selector('.b-content__inline_item-link a').map((i, x) => (
            selector(x).text()
        )).toArray();

        const ids = selector('.b-content__inline_item').map((i, x) => (
            selector(x).attr('data-id')
        )).toArray();

        const images = selector('.b-content__inline_item-cover img').map((i, x) => (
            selector(x).attr('src')
        )).toArray();

        const result = ids.map((res, key) => (
            { id: ids[key], title: titles[key], poster: images[key] }
        ))

        res.status(200).json({ search: result })
    } catch (err) {
        res.status(200).json({ error: err })
    }
}

export default Search