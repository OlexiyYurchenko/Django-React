import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';
import { ErrorForm } from '../sw-components';


export default class ArticleAddPage extends Component {

  state = {
    ErrorServer: false
  }

  onError = () => {
    this.setState({
      ErrorServer: false
    });
  };

  onArticle = (event) => {
    event.preventDefault();
    const that = this;
    const data = new FormData(event.target);
    fetch('/request/add/', {
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
            console.log(data.result);
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
      const { ErrorServer } = this.state;
      const { isLoggedIn } = this.props;

      
      if (!isLoggedIn) {
        return <Redirect to="/"/>;
      }

      return (
          <div>
            <ErrorForm ErrorServer={ErrorServer} onError={this.onError} />

            <div className="popup">
              <div class="popup-box__title">New Post</div>

              <form onSubmit={this.onArticle}>
                <DjangoCSRFToken/>
                <div className="row">
                  <label htmlFor="title">Title your post</label>
                  <input className="input" id="title" name="title" type="text" minLength={5} maxLength={128} required />
                </div>

                <div className="row">
                  <label htmlFor="text">Text</label>
                  <textarea rows="10" className="input" id="text" name="text" minLength={5} maxLength={4096} required />
                </div>
        
                <button>Post</button>
              </form>
            </div>
          </div>

      );

  }
};

