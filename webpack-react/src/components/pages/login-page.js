import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';

export default class LoginPage extends Component {

  render() {

      const { isLoggedIn, onLogin } = this.props;

    
      if (isLoggedIn) {
        return <Redirect to="/"/>;
      }
    
      return (
        <div>
          <div className="popup">
            <div class="popup-box__title">Sign in</div>
            <form onSubmit={onLogin}>
              <DjangoCSRFToken/>
              <div className="row">
                <label htmlFor="username">Username</label>
                <input className="input" id="username" name="username" type="text" />
              </div>

              <div className="row">
                <label htmlFor="password">Password</label>
                <input className="input" id="password" name="password" type="password" />
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

