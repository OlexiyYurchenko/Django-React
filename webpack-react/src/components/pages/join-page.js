import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';

export default class JoinPage extends Component {

  render() {

      const { isLoggedIn, onJoin } = this.props;

    
      if (isLoggedIn) {
        return <Redirect to="/"/>;
      }
    
      return (
        <div>
          <div className="popup">
            <div class="popup-box__title">Registration</div>
            <form onSubmit={onJoin}>
              <DjangoCSRFToken/>

              <div className="row">
                <label htmlFor="username">Enter username</label>
                <input className="input" id="username" name="username" type="text" />
              </div>

              <div className="row">
                <label htmlFor="email">Enter your email</label>
                <input className="input" id="imail" name="email" type="email" />
              </div>

              <div className="row">
                <label htmlFor="password">Enter your pass</label>
                <input className="input" id="password" name="password" type="password" />
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

