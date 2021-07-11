import axios from 'axios';
//const chromium = require('chrome-aws-lambda');
//const puppeteer = require('puppeteer')
import cheerio from 'cheerio';
import querystring from 'querystring';

const GetUrl = async (req, res) => {
    if (req.query.source === 'vcdn') {
        /*const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });*/
        const page = await browser.newPage();
        const pageurl = req.query.type === 'tv_series' ? `https://38.svetacdn.in/DtnlpDk36lY6/tv-series/${req.query.id}?season=${req.query.season}&episode=${req.query.episode}&translation=${req.query.translation}` : `https://38.svetacdn.in/DtnlpDk36lY6/movie/${req.query.id}?translation=${req.query.translation}`;
        await page.goto(pageurl);
        await page.waitForSelector('input');
        await page.mouse.click(400, 300);
        const res = await page.waitForResponse(response => response.url().includes('seg-1-v1-a1.ts'));
        const url = await res.url();
        const result = url.substr(0, url.length - 26);
        res.status(200).json({ url: result });
        await browser.close();
    }

    if (req.query.source === 'rezka') {
        /*const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });*/

        const Translate = async () => {
            const rezkatranslate = (await axios.get(`https://rezkance.com/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`,
                {
                    headers: {
                        'Origin': 'https://rezkance.com',
                        'Referer': 'https://rezkance.com/',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                    }
                })).data;
            const selector = cheerio.load(rezkatranslate);
            const translations = selector('.b-translator__item').map((i, x) => (
                { id: selector(x).attr('data-translator_id'), name: selector(x).attr('title') }
            )).toArray();

            return translations;
        }
        const Urls = async () => {
            if (req.query.season !== undefined && req.query.episode !== undefined) {
                if (req.query.translation !== undefined) {
                    const rezkaapi = await axios.post('https://rezkance.com/ajax/get_cdn_series/?t=1624443285637', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                    return rezkaapi.data
                } else {
                    const rezkaapi = await axios.post('https://rezkance.com/ajax/get_cdn_series/?t=1624443285637', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                    return rezkaapi.data
                }
            } else {
                if (req.query.translation !== undefined) {
                    const rezkaapi = await axios.post('https://rezkance.com/ajax/get_cdn_series/?t=1624443285637', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'action': 'get_episodes' }));
                    return rezkaapi.data
                } else {
                    const rezkaapi = await axios.post('https://rezkance.com/ajax/get_cdn_series/?t=1624443285637', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id, 'action': 'get_episodes' }));
                    return rezkaapi.data
                }
            }
        }
        try {
            const urls = (await Urls()).url.split(',').reverse().reduce(
                (acc, item) => {
                    const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
                    acc.push({ quality: quality, urls: [url1, url2] });
                    return acc;
                },
                []
            );

            res.status(200).json({ translations: await Translate(), urls: urls });
        } catch (err) {
            res.status(200).json({ err });

        }
    }
}

export default GetUrl