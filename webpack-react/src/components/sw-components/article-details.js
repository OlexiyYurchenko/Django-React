import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const ArticleDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="created_at" label="Data" />
      <Record field="text" label="Text" />
      <Record field="user" label="User" />
      <Record field="title" label="Title" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getArticle,
  }
};

export default withSwapiService(mapMethodsToProps)(ArticleDetails);
  