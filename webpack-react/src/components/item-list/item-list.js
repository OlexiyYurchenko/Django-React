import React from 'react';
import Items from './items';

import './item-list.css';

const ItemList = (props) => {

  const { data } = props;

  return (
    <ul className="item-list list-group">
      <Items data={data} />
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