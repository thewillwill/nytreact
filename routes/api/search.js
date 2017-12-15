const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

const axios = require("axios");

// Matches with "/api/articles"
router.get("/", (req, res) => {
    console.log("************ in api/search ************")

    const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    let queryURL = queryURLBase + authKey + "&q=obama";
  	console.log("Querying:", queryURL)
  axios
    .get(queryURL)
    .then(({ data: { results } }) => {
    	console.log("search.js - data: ", data);
    	console.log("search.js - results: ", results);
    	res.json(results)
    })
    .catch(err => res.status(422).json(err));
})


module.exports = router;