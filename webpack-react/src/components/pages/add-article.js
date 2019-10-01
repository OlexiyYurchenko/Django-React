import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';

export default class ArticleAddPage extends Component {

  render() {
      const { isLoggedIn } = this.props;

      
      if (!isLoggedIn) {
        return <Redirect to="/"/>;
      }

      const { onArticle } = this.props;
      return (
          <div className="popup">
            <div class="popup-box__title">New Post</div>

            <form onSubmit={onArticle}>
              <DjangoCSRFToken/>
              <div className="row">
                <label htmlFor="title">Title your post</label>
                <input className="input" id="title" name="title" type="text" />
              </div>

              <div className="row">
                <label htmlFor="text">Text</label>
                <textarea rows="10" className="input" id="text" name="text"  />
              </div>
      
              <button>Post</button>
            </form>
          </div>

      );

  }
};

