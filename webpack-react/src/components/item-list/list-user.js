import React from 'react';
import { Link } from 'react-router-dom';

import './item-list.css';

const UserListItem = (props) => {

  const { data } = props;

  const items = data.map((item) => {
    const { id, username, photo_url, count } = item;

    return (
      
      <div className="block block-user" key={id}> 
        <div className="title-block">
          <img src={photo_url} alt={username} />
          <Link className="user-block" to={`/user/${id}/`}>
            {username}
          </Link>
            <Link className="btn btn-more" to={`/user/${id}/`}>View profile →</Link>
        </div>
        <div className="count">{count.length}</div>
      </div>
    );
  });

  return (
    <div>  
        <div className="header-user">
            <div>User</div>
            <div>Articles</div>
        </div>
        <ul className="item-list list-group">
            {items}
        </ul>
    </div>
  );
};

UserListItem.defaultProps = {
  onItemSelected: () => {}
};

// UserListItem.propTypes = {
//   onItemSelected: propTypes.func,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   children: propTypes.func.isRequired
// };


export default UserListItem;