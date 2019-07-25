import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
        this.props.itemId !== prevProps.itemId || 
        this.props.getData !== prevProps.getData
        ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item
        });
      });
  }

  render() {

    const { item } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { text, created_at, user, title } = item;

    return (
      <div className="item-details card">
        <div className="card-body">
          <div className="title-block">
            <div className="user-block">{user}</div>
            <span className="post__time">{created_at}</span>
          </div>
          <div className="title">{title}</div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }
}
