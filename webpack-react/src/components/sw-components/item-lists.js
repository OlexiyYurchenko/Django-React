import React from 'react';
import ItemList from '../item-list';

import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

  
const renderName = ({ title }) => <span>{title}</span>;

const mapArticleMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllArticle,

    }
};



const ArticleList = compose(
                      withSwapiService(mapArticleMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(ItemList);



export {
    ArticleList
  };