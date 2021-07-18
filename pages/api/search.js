import axios from 'axios';
import cheerio from 'cheerio';

const Search = async (req, res) => {
    try {
        const search = (await axios.get(`https://rezkance.com/search/?do=search&subaction=search&q=${encodeURIComponent(req.query.q)}&page=1`,
            {
                headers: {
                    'Cookie': 'PHPSESSID=i9nisa3paglukt9sb66qtrvd15; dle_user_token=8e75b8a65e227e477abd3a31a2d258be'
                }
            })).data

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