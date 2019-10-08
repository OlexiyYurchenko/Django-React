import React from 'react';
import { ArticleDetails, ArticleList, ArticleUserDetails } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';


const ArticlePage = ({ isLoggedIn, UserId, history, match }) => {

    const { id } = match.params


    if ( match.path == '/user/:id?') {
      return (
        <ArticleUserDetails UserId={UserId} itemId={ id } />
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

