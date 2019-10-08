import React, { Component } from 'react';
import Spinner from '../spinner';
import Items from './items';
import UserInfo from '../user-info';
import { Link } from 'react-router-dom';

import './item-list.css';

export default class ItemListUser extends Component {

  state = {
    data: null,
    loading: true,
    ErrorServer: false
  };

  componentDidMount() {
    this.updateItem();
  } 

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((itemd) => {

        this.setState({
          data: itemd,
          loading: false,
        });
      }); 
  };

  render() {

    const { data, loading } = this.state;
    const { UserId } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <UserInfo UserId={UserId} UserProfile={data} />
        <ul className="item-list list-group">
          <Items data={data.article_user} />
        </ul>
      </div>
    );
  };
};

ItemListUser.defaultProps = {
  onItemSelected: () => {}
};

// ItemListUser.propTypes = {
//   onItemSelected: propTypes.func,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   children: propTypes.func.isRequired
// };


// export default ItemListUser;