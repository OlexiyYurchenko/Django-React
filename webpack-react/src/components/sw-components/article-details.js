import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const ArticleDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="created_at" label="Data" />
      <Record field="announce_text" label="Text" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getArticle,
  }
};

export default withSwapiService(mapMethodsToProps)(ArticleDetails);
  