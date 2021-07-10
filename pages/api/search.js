import axios from 'axios';

const Search = async (req, res) => {
    try {
        const search = (await axios.get(`https://filmix.beer/api/v2/suggestions?search_word=${encodeURIComponent(req.query.q)}`,
            {
                headers: {
                    "x-requested-with": "XMLHttpRequest"
                }
            })).data

        res.status(200).json({ search: search.posts })
    } catch (err) {
        res.status(200).json({ error: err })
    }
}

export default Search