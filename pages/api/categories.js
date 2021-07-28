import axios from 'axios';
import cheerio from 'cheerio';

const Categories = async (req, res) => {
    const data = (await axios.get(`http://f0561301.xsph.ru/categories.php?category=${req.query.category}`)).data
    const selector = cheerio.load(data);

    const title = selector('.b-content__htitle h1').text();

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
    ));

    res.status(200).json({ items: result, title: title })
}

export default Categories