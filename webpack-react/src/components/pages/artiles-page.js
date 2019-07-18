import React from 'react';
import { ArticleDetails, ArticleList } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';


const ArticlePage = ({ history, match }) => {
    const { id } = match.params;
    
    if (id != undefined) {
      return (
        <ArticleDetails itemId={ id } />
      )
    };

    return (
        <ArticleList onItemSelected={(id) => {history.push(id)}} />
    );
};

export default withRouter(ArticlePage);

