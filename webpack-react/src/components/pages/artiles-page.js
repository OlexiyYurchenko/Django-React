import React from 'react';
import { ArticleDetails, ArticleList, ArticleUserDetails } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';


const ArticlePage = ({ isLoggedIn, history, match }) => {

    const { id } = match.params;

    if ( match.path == '/user/:id?') {
      return (
        <ArticleUserDetails itemId={ id } />
      )
    }
    
    if (id != undefined) {
      return (
        <ArticleDetails itemId={ id } isLoggedIn={isLoggedIn} />
      )
    };

    return (
        <ArticleList onItemSelected={(id) => {history.push(id)}} />
    );
};

export default withRouter(ArticlePage); 

