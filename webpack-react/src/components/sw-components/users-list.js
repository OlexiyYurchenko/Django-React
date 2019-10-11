import React from 'react';
import UserListItem from '../item-list/list-user';

import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

  
const renderName = ({ title }) => <span>{title}</span>;

const mapArticleMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllUser,

    }
};



const UsersList = compose(
                      withSwapiService(mapArticleMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(UserListItem);



export { 
    UsersList
  };