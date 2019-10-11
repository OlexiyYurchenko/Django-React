import React from 'react';
import { UsersList } from '../sw-components';
import { withRouter } from 'react-router-dom';


const UsersPage = ({  history, match }) => {

    return (
        <UsersList  />
    );
};

export default withRouter(UsersPage); 

