import React from 'react';
import { Link } from 'react-router-dom';

import './item-list.css';

const ItemListUser = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;
  console.log(data);

  const items = data.article_user.map((item) => {
    const { id, announce_text, user, created_at, photo_url, pk_user } = item;
    const label = renderLabel(item);

    return (
      
      <div className="block" key={id}> 
        <div className="title-block">
          <img src={photo_url} alt={user} />
          <Link className="user-block" to={'/user/' + pk_user + '/'}>
            {user}
          </Link>
          <span class="post__time">{created_at}</span>
        </div>
        <div className="title">
          <Link to={'/articles/' + id + '/'}>{label}</Link>
        </div>
        <div className="text">{ announce_text }...</div>
        <Link className="btn btn-more" to={'/articles/' + id + '/'}>Читать дальше →</Link>
      </div>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

ItemListUser.defaultProps = {
  onItemSelected: () => {}
};

// ItemListUser.propTypes = {
//   onItemSelected: propTypes.func,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   children: propTypes.func.isRequired
// };


export default ItemListUser;