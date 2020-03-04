/** @format */

import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import ArticlePreview from './ArticlePreview';
import SortBy from './SortBy';
import ErrorHandler from './ErrorHandler';

class Topics extends Component {
  state = {
    articles: [],
    isLoading: true,
    queries: [],
    queryValue: '',
    err: null
  };

  componentDidMount() {
    api
      .getArticleByTopic(this.props.topic)
      .then(articles => {
        this.setState(currentState => {
          return {
            articles: articles,
            isLoading: false
          };
        });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.queries !== this.state.queries
    ) {
      api
        .getArticleByTopic(this.props.topic, this.state.queries)
        .then(articles => {
          this.setState(currentState => {
            return {
              articles: articles,
              isLoading: false
            };
          });
        });
    }
  }

  handleQuery = (queries, value) => {
    this.setState({ queries, isLoading: true, queryValue: value });
  };

  render() {
    if (this.state.err) return <ErrorHandler error={this.state.err.response} />;
    if (this.state.isLoading) return <Loading />;
    return (
      <div>
        <SortBy
          handleQuery={this.handleQuery}
          queryValue={this.state.queryValue}
        />
        {this.state.articles.map(article => {
          return <ArticlePreview key={article.article_id} article={article} />;
        })}
      </div>
    );
  }
}

//this doesn't work yet :(

export default Topics;
