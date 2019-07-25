import React from 'react';
import { Link } from 'react-router-dom';

import './item-list.css';

const ItemList = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    const { id, announce_text, user, created_at } = item;
    const label = renderLabel(item);

    return (
      
      <div className="block" key={id}>
        <div className="title-block">
          <div className="user-block">{user}</div>
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

ItemList.defaultProps = {
  onItemSelected: () => {}
};

// ItemList.propTypes = {
//   onItemSelected: propTypes.func,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   children: propTypes.func.isRequired
// };


export default ItemList;