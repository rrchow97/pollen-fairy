const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios')
// const API_KEY = require('./config.js')

let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

let port = 3030;

app.get('/pollen', (req, res) => {
  axios.get(`https://api.ambeedata.com/latest/pollen/by-place?place=${req.query.place}`, {
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-type": "application/json"
    }
  })
    .then( (data) => {
      var resObj = {
        tree: data.data['data'][0]['Count']['tree_pollen'],
        grass: data.data['data'][0]['Count']['grass_pollen'],
        weed: data.data['data'][0]['Count']['weed_pollen'],
        treeStr: data.data['data'][0]['Risk']['tree_pollen'],
        grassStr: data.data['data'][0]['Risk']['grass_pollen'],
        weedStr: data.data['data'][0]['Risk']['weed_pollen'],
        city: req.query.place
      }
      res.send(resObj)
    })
    .catch( (err) => {
      var resObj = {
        tree: null,
        grass: null,
        weed: null,
        treeStr: '',
        grassStr: '',
        weedStr: '',
        city: ''
      }
      res.send(resObj)
    })
})

app.listen(process.env.PORT | port, function() {
  console.log(`listening on port ${port}`);
});

