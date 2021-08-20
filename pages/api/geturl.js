import axios from "axios";
//const chromium = require('chrome-aws-lambda');
//const puppeteer = require('puppeteer')
import cheerio from "cheerio";
import querystring from "querystring";

const GetUrl = async (req, res) => {
  if (req.query.source === "vcdn") {
    /*const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });*/
    const page = await browser.newPage();
    const pageurl =
      req.query.type === "tv_series"
        ? `https://38.svetacdn.in/DtnlpDk36lY6/tv-series/${req.query.id}?season=${req.query.season}&episode=${req.query.episode}&translation=${req.query.translation}`
        : `https://38.svetacdn.in/DtnlpDk36lY6/movie/${req.query.id}?translation=${req.query.translation}`;
    await page.goto(pageurl);
    await page.waitForSelector("input");
    await page.mouse.click(400, 300);
    const res = await page.waitForResponse((response) =>
      response.url().includes("seg-1-v1-a1.ts")
    );
    const url = await res.url();
    const result = url.substr(0, url.length - 26);
    res.status(200).json({ url: result });
    await browser.close();
  }

  if (req.query.source === "rezka") {
    try {
      const Translate = async () => {
        const rezkatranslate = (
          await axios.get(`http://f0561301.xsph.ru/?id=${req.query.id}`)
        ).data;
        const selector = cheerio.load(rezkatranslate);
        const translations = selector(".b-translator__item")
          .map((i, x) => ({
            id: selector(x).attr("data-translator_id"),
            name: selector(x).attr("title"),
          }))
          .toArray();

        const activeElem = selector(".b-translator__item.active");
        const active = {
          id: activeElem.attr("data-translator_id"),
          name: activeElem.attr("title"),
        };

        if (translations.length === 0) {
          var textNode = selector("body > script")
            .map((i, x) => x.children[0])
            .filter((i, x) => x && x.data.match(/sof.tv./))
            .get(0);
          const id = textNode.data.match(/\d+/g)[1];

          return { active: { id: id, name: "Оригинальный" } };
        } else {
          return { list: translations, active };
        }
      };

      const Urls = async () => {
        if (req.query.season !== undefined && req.query.episode !== undefined) {
          if (req.query.translation !== undefined) {
            const rezkaapi = await axios.post(
              "http://rezkance.com/ajax/get_cdn_series/",
              querystring.stringify({
                id: req.query.id,
                translator_id: req.query.translation,
                season: req.query.season,
                episode: req.query.episode,
                action: "get_stream",
              })
            );
            return rezkaapi.data;
          } else {
            const rezkaapi = await axios.post(
              "http://rezkance.com/ajax/get_cdn_series/",
              querystring.stringify({
                id: req.query.id,
                translator_id: (await Translate()).active.id,
                season: req.query.season,
                episode: req.query.episode,
                action: "get_stream",
              })
            );
            return rezkaapi.data;
          }
        } else {
          if (req.query.translation !== undefined) {
            const rezkaapi = await axios.post(
              "http://rezkance.com/ajax/get_cdn_series/",
              querystring.stringify({
                id: req.query.id,
                translator_id: req.query.translation,
                action: "get_movie",
              })
            );
            return rezkaapi.data;
          } else {
            const rezkaapi = await axios.post(
              "http://rezkance.com/ajax/get_cdn_series/",
              querystring.stringify({
                id: req.query.id,
                translator_id: (await Translate()).active.id,
                action: "get_movie",
              })
            );
            return rezkaapi.data;
          }
        }
      };

      const urls = (await Urls()).url
        .split(",")
        .reverse()
        .reduce((acc, item) => {
          const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
          acc.push({ quality: quality, urls: [url1, url2] });
          return acc;
        }, []);

      res.status(200).json({ urls: urls });
    } catch (err) {
      res.status(200).json({ err: err });
    }
  }
};

export default GetUrl;
