import React from 'react';
import { Link } from 'react-router-dom';



const UserSetting = (props) => {

    const { UserId, ProfileId, isLoggedIn } = props;

    if ( UserId == ProfileId && isLoggedIn ) {
        return (
            <Link className="settings-btn btn" to="/settings/">Setting</Link>
        );
    }
    return null
};

export default UserSetting