import axios from "axios";

export default {

    //gets new articles from api/search route
    searchArticles: function(topic, begin, end) {

        console.log('searchArticles (API.js)', 'topic:', topic, 'begin:', begin, 'end:', end);     
        //console.log("axios.get api/search", axios.get("/api/search", { params: { q: topic, begin_date: begin, end_date: end }}));

        return axios.get("/api/search", { query: { q: topic, begin_date: begin, end_date: end } });

        // queryURLBase is the start of our API endpoint.
        // const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
        // const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
        // const queryURL = queryURLBase + authKey + "q=" + topic;
        // console.log(`queryURL: ${queryURL}`);
    },

    // Gets all articles
    getSavedArticles: function() {
        console.log('getSavedArticleS')
        return axios.get("/api/articles");
    },
    // Gets the book with the given id
    getSavedArticle: function(id) {
        console.log('getSavedArticlE', 'id:', id)
        return axios.get("/api/articles/" + id);
    },
    // Deletes the book with the given id
    deleteSavedArticle: function(id) {
        console.log('deleteSavedArticle', 'id:', id)
        return axios.delete("/api/articles/" + id);
    },
    // Saves an article to the database
    saveArticle: function(articleData) {
        console.log('saveArticle', 'articleData:', articleData)
        return axios.post("/api/articles", articleData);
    }
};