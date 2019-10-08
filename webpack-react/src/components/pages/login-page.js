import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';
import { ErrorForm } from '../sw-components';

export default class LoginPage extends Component {

  state = {
    UserFormError: false,
    ErrorServer: false
  }

  onError = () => {
    this.setState({
      UserFormError: false,
      ErrorServer: false
    });
  };

  onLogin = (event) => {
    event.preventDefault();
    const that = this;
    const data = new FormData(event.target);
    fetch('/request/login/', {
      method: 'POST',
      body: data,
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          that.setState({
            ErrorServer: true,
          });
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        } else {
          response.json().then(function(data) {  
            console.log(data.result);
            if (data.result != 'error') {
              that.props.onUser()
            } else {
                that.setState({
                  UserFormError: true,
                });
            }
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
      const { UserFormError, ErrorServer } = this.state;
      const { isLoggedIn } = this.props;


    
      if (isLoggedIn) {
        return <Redirect to="/"/>;
      }
    
      return (
        <div>
          <ErrorForm UserFormError={UserFormError} ErrorServer={ErrorServer} onError={this.onError} />
          <div className="popup">

            <div class="popup-box__title">Sign in</div>
            <form onSubmit={this.onLogin}>
              <DjangoCSRFToken/>
              <div className="row">
                <label htmlFor="username">Username</label>
                <input className="input" id="username" name="username" type="text"  minLength={5} maxLength={10} required />
              </div>

              <div className="row">
                <label htmlFor="password">Password</label>
                <input className="input" id="password" name="password" type="password"  minLength={8} maxLength={20} required />
              </div>

              <button>Sign in</button>
            </form>
          </div>
          <div className="popup popup-second">

            <div className="text">Have no account yet? </div>
            <Link className="" to="/join/">
              Sign up
            </Link>
          </div>
        </div>
      );

  }
};

