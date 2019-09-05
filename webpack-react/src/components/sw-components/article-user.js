import React from 'react';
// import UserItemList from '../item-list';
import ItemList from '../item-list';


// import { withSwapiService } from '../hoc-helpers';




// const ArticleUserDetails = (props) => { 

//     return (
//         <ItemList {...props} />

//     );
// };

// const mapMethodsToProps = (swapiService) => {
//     return {
//         getData: swapiService.getArticleUser,
//     }
// };

// export default  withSwapiService(mapMethodsToProps)(ArticleUserDetails);

import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

  
const renderName = ({ title }) => <span>{title}</span>;

const mapArticleMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getArticleUser,

    }
};



const ArticleUserDetails = compose(
                      withSwapiService(mapArticleMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(ItemList);



export {
    ArticleUserDetails
  };