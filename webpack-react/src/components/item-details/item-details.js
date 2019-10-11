import React, { Component } from 'react';

import DjangoCSRFToken from 'django-react-csrftoken';
import { Link } from 'react-router-dom';
import { ErrorForm } from '../sw-components';
import Spinner from '../spinner';
import Comments from '../comment';

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
    item: null,
    ErrorServer: false,
    loading: true,
  };

  componentDidMount() {
    this.updateItem();
  }
 
  onError = () => {
    this.setState({
      ErrorServer: false
    });
  };

  
  onLike = (id, val) => {
    const that = this;
    fetch(`/request/artlike/${id}/${val}`, {
      method: 'GET'
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          that.setState({
            ErrorServer: true,
          });
          return;  
        } else {
          response.json().then(function(data) {  
            that.updateItem();
          });  
        }
  
      }  
    )  
    
  };

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
          item: item,
          loading: false
        });
      });
  }

  onComment = (event) => {
    const that = this;
    event.preventDefault();
    const data = new FormData(event.target);
    fetch(`/request/comment/`, {
      method: 'POST',
      body: data,
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          that.setState({
            ErrorServer: true,
          });
          return;  
        } else {
          response.json().then(function(data) {  
            that.updateItem();
          });  
        }
  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
      that.setState({
        ErrorServer: true,
      });
    });

  };


  render() {

    const { item, ErrorServer, loading } = this.state;
    const {isLoggedIn} = this.props;

    if (loading) {
      return <Spinner />;
    }
    
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { text, created_at, autor_name, title, likes, dislikes, id, photo_url, pk_user, comment } = item;

      return (
        <div className="item-details card">
          <ErrorForm ErrorServer={ErrorServer} onError={this.onError} />
          <div className="card-body">
            <div className="title-block">
              <img src={photo_url} alt={item.autor_name} />
              <Link className="user-block" to={`/user/${pk_user}/`}>
                {autor_name}
              </Link>
              <span className="post__time">{created_at}</span>
            </div>
            <div className="title">{title}</div>
            <div className="text">{text}</div>
            <div className="post__footer">
              <div className="rating">
                <div className="article-like" onClick={() => this.onLike(id, 1)}><i className="icon-arrow-up"></i></div>
                  <span>{likes}</span>
                <div className="article-like" onClick={() => this.onLike(id, 2)}><i className="icon-arrow-down"></i></div>
              </div>
            </div>
            <div className="comment">
              <div class="comments-section__head">
                <h2 class="comments-section__head-title">
                  Комментарии
                  <span class="comments-section__head-counter"></span>
                </h2>
              </div>
  
              <div class="comment-form">
                <div class="comment-form__title">
                  <span class="comment-form__title-text">Написать комментарий</span>
                </div>

                  {isLoggedIn ? (

                    <form onSubmit={this.onComment}>
                      <DjangoCSRFToken/>
                      <div className="row">
                        <textarea className="input" id="text" name="text" type="text" cols="30" row="5"  required ></textarea>
                        <input  name="id" type="hidden" value={id}/>
                      </div>
                      <button>Send</button>
                    </form>
                  ) : (null)}

              </div>

              <Comments data={comment} />

            </div>
          </div>
        </div>
      );

    
  }
}
