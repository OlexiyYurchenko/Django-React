import React from 'react';
import UserSetting from './settings-btn';


const UserInfo = (props) => {

    const { UserId, UserProfile, isLoggedIn } = props;

    return (
        <div>
        <div className="user-info">
            <img src={UserProfile.photo_url} alt={UserProfile.username} />
            <UserSetting UserId={UserId} ProfileId={UserProfile.id} isLoggedIn={isLoggedIn} />
        </div>
            <div class="user-info__about">
                <div class="user-info__links">
                    <h1 class="user-info__name">
                        <div class="user-info__fullname">{UserProfile.username}</div>
                    </h1>
                </div>
                    <div class="user-info__specialization"></div>
            </div>
        </div>
    );
};

export default UserInfo