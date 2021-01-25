const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { response } = require('express');

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Rates App')
})

app.get('/api/rates', (req, res) => {
    let url = `https://api.exchangeratesapi.io/latest?base=${req.query.base ?? ""}&symbols=${req.query.currency ?? ""}` 
    axios.get(url)
    .then(response => {
        res.send({result: response.data});
    })
    .catch(err => {
        res.send({
            data: err.response.data ?? [],
            message: err.message
        }, err.response.status ?? 404);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})