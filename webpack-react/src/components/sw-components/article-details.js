import React from 'react';
import ItemDetails from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const ArticleDetails = (props) => {
  return (
    <ItemDetails {...props} />
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getArticle,
  }
};

export default withSwapiService(mapMethodsToProps)(ArticleDetails);
  