import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import moment from "moment";


const axios = require("axios");
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey;

class Articles extends Component {
    state = {
        articles: [],
        newArticles: [],
        topic: "",
        begin: "",
        end: "",
        isLoading: true
    };

    componentDidMount() {
        this.loadSavedArticles();
    }

    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res =>
                this.setState({
                    articles: res.data,
                    topic: "",
                    title: "",
                    date: "",
                    URL: ""
                })
            )
            .catch(err => console.log(err));
    };

    deleteSavedArticle = id => {
        API.deleteSavedArticle(id)
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
    };

    saveArticle = articleData => {
        API.saveArticle(articleData)
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
        // the user hits the search button

        axios
            .get(url, {
                query: {
                    q: this.state.topic,
                    begin_date: this.state.begin,
                    end_date: this.state.end
                }
            })
            .then(response => {
                console.log("this is response", response.data.response.docs);
                this.setState({
                    newArticles: response.data.response.docs
                });
            });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-12">
                        <Jumbotron>
                            <h1> Search Articles </h1>
                            <form>
                                <Input
                                    value={this.state.topic}
                                    onChange={this.handleInputChange}
                                    name="topic"
                                    placeholder="Topic (required)"
                                />

                                <Input
                                    value={this.state.begin}
                                    onChange={this.handleInputChange}
                                    name="begin"
                                    placeholder="Start Year (Optional)"
                                />

                                <Input
                                    value={this.state.end}
                                    onChange={this.handleInputChange}
                                    name="end"
                                    placeholder="End Year (Optional)"
                                />

                                <FormBtn
                                    disabled={!this.state.topic}
                                    onClick={this.handleFormSubmit}
                                >
                                    Search for Articles
                                </FormBtn>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="lg-12">
                        <Jumbotron>
                            <h1> Search Results</h1>{" "}
                            {this.state.newArticles.length ? (
                                <List>
                                    {" "}
                                    {this.state.newArticles.map(newArticle => (
                                        <ListItem key={newArticle._id}>
                                            <Link
                                                to={
                                                    "/newArticles/" +
                                                    newArticle._id
                                                }
                                            >
                                                <strong>
                                                    {newArticle.pub_date}" - "}{newArticle.headline.main}{" "}
                                                    by {newArticle.begin}{" "}
                                                </strong>
                                            </Link>{" "}
                                            <SaveBtn
                                                onClick={() =>
                                                    this.deleteSavedArticle(
                                                        newArticle._id
                                                    )
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <h3> No Results to Display </h3>
                            )}{" "}
                        </Jumbotron>
                    </Col>

                    <Col size="lg-12">
                        <Jumbotron>
                            <h1> Saved Articles </h1>{" "}
                            {this.state.articles.length ? (
                                <List>
                                    {" "}
                                    {this.state.articles.map(article => (
                                        <ListItem key={article._id}>
                                            <Link
                                                to={"/articles/" + article._id}
                                            >
                                                <strong>
                                                    {" "}
                                                    {article.title} by{" "}
                                                    {article.begin}{" "}
                                                </strong>
                                            </Link>{" "}
                                            <DeleteBtn
                                                onClick={() =>
                                                    this.deleteSavedArticle(
                                                        article._id
                                                    )
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <h3> No Results to Display </h3>
                            )}{" "}
                        </Jumbotron>
                    </Col>
                </Row>{" "}
            </Container>
        );
    }
}

export default Articles;
