import React from 'react';

import './header.css';

import { Link } from 'react-router-dom';

const Header = ({isLoggedIn, UserName, onlogout, OpenMenu, onToggleOpen}) => {

  let className = 'drop-menu';


  if(OpenMenu) {
    className += ' open';
  }

  if(isLoggedIn) {
    return (
      <div className="header">
        <div className="container">
          <div className="holder">
            <div className="logo">
              <Link to="/">
                Blog
              </Link >
            </div>


            <div className={className}>
                <div className="btn" onClick={onToggleOpen}></div>
                <div className="drop-header">
                  <div className="user">
                    <span class="user-info__nickname">{UserName}</span>
                    <span class="user-info__special">Профиль</span>
                  </div>
        
                    <Link className="login" to="/add/">
                      Add Post
                    </Link>
                    <div className="join" onClick={onlogout}>
                      Logout
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="header">
      <div className="container">
        <div className="holder">
          <div className="logo">
            <Link to="/">
              Blog
            </Link >
          </div>

          <div className="nav">
            <Link className="login btn" to="/login/">
              Sign in
            </Link>
            <Link className="join btn" to="/join/">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;