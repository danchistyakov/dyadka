import axios from 'axios';

const Categories = async (req, res) => {
    if (req.query.category === 'viewing') {
        const category = (await axios.get(`http://103.119.112.27/partner_api/viewing?page=0`,
            {
                headers: {
                    "X-FX-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6ImZ4LTYwZWFiNmEzZWM0OGYifQ.eyJpc3MiOiJodHRwczpcL1wvZmlsbWl4Lm1lIiwiYXVkIjoiaHR0cHM6XC9cL2ZpbG1peC5tZSIsImp0aSI6ImZ4LTYwZWFiNmEzZWM0OGYiLCJpYXQiOjE2MjU5OTQ5MTUsIm5iZiI6MTYyNTk4NDExNSwiZXhwIjoxNjI4NTg2OTE1LCJwYXJ0bmVyX2lkIjoiMiIsImhhc2giOiI1MmI3MmU4M2E4YzA0Y2M0ZWQ5YmRiYjU4NmNmMGFkZTM2MDc3OTFhIiwidXNlcl9pZCI6bnVsbCwiaXNfcHJvIjpmYWxzZSwiaXNfcHJvX3BsdXMiOmZhbHNlLCJzZXJ2ZXIiOiIifQ.-jooDI9dRoN9Sd6f8sb82cmvP9Lqx-TjUiVQEuLGpmo"
                }
            })).data

        res.status(200).json({ category: category })
    }

    if (req.query.category === 'popular') {
        const category = (await axios.get(`http://103.119.112.27/partner_api/popular?page=0`,
            {
                headers: {
                    "X-FX-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6ImZ4LTYwZWFiNmEzZWM0OGYifQ.eyJpc3MiOiJodHRwczpcL1wvZmlsbWl4Lm1lIiwiYXVkIjoiaHR0cHM6XC9cL2ZpbG1peC5tZSIsImp0aSI6ImZ4LTYwZWFiNmEzZWM0OGYiLCJpYXQiOjE2MjU5OTQ5MTUsIm5iZiI6MTYyNTk4NDExNSwiZXhwIjoxNjI4NTg2OTE1LCJwYXJ0bmVyX2lkIjoiMiIsImhhc2giOiI1MmI3MmU4M2E4YzA0Y2M0ZWQ5YmRiYjU4NmNmMGFkZTM2MDc3OTFhIiwidXNlcl9pZCI6bnVsbCwiaXNfcHJvIjpmYWxzZSwiaXNfcHJvX3BsdXMiOmZhbHNlLCJzZXJ2ZXIiOiIifQ.-jooDI9dRoN9Sd6f8sb82cmvP9Lqx-TjUiVQEuLGpmo"
                }
            })).data

        res.status(200).json({ category: category })
    }
}

export default Categories