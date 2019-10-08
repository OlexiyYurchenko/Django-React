import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';
import { ErrorForm } from '../sw-components';


export default class JoinPage extends Component {

  state = {
    UserUnique: false,
    ErrorServer: false
  }

  onError = () => {
    this.setState({
      UserUnique: false,
      ErrorServer: false
    });
  };

  onJoin = (event) => {
    event.preventDefault();
    const that = this;
    const data = new FormData(event.target);
    fetch('/request/join/', {
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
            if (data.result != 'error') {
              that.props.onUser()
            } else {
              that.setState({
                UserUnique: true,
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

      const { UserUnique, ErrorServer } = this.state;

      const { isLoggedIn } = this.props;

    
      if (isLoggedIn) {
        return <Redirect to="/"/>;
      }
    
      return (
        <div>
          <ErrorForm UserUnique={UserUnique} ErrorServer={ErrorServer} onError={this.onError} />
          <div className="popup">
            <div class="popup-box__title">Registration</div>
            <form onSubmit={this.onJoin}>
              <DjangoCSRFToken/>

              <div className="row">
                <label htmlFor="username">Enter username</label>
                <input className="input" id="username" name="username" type="text" minLength={5} maxLength={10} required />
              </div>

              <div className="row">
                <label htmlFor="email">Enter your email</label>
                <input className="input" id="imail" name="email" type="email" required />
              </div>

              <div className="row">
                <label htmlFor="password">Enter your pass</label>
                <input className="input" id="password" name="password" type="password" minLength={8} maxLength={20} require />
              </div>
      
              <button>Join</button>
            </form>
          </div>
          <div className="popup popup-second">

            <div className="text">Already registered? </div>
            <Link className="" to="/login/">
              Sign in
            </Link>
          </div>
        </div>

      );

  }
};

