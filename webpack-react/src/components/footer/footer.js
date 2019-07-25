import React, { Component } from 'react';
import './footer.css';

import { Link } from 'react-router-dom';

export default class Footer extends Component {

  render() {

    const {isLoggedIn} = this.props;

    if(isLoggedIn) {
      return (
        <div className="footer">
          <div className="container">
            <div className="holder">
              <div className='footer-menu'>
                <Link className="footer-btn" to="/add/">
                  Add Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="footer">
        <div className="container">
          <div className="holder">
            <div className="footer-menu">
              <Link className="footer-btn" to="/login/">
                Sign in
              </Link>
              <Link className="footer-btn" to="/join/">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
