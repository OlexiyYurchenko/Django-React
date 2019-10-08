import React, { Component } from 'react';
import './header.css';

import { Link } from 'react-router-dom';

export default class JoinPage extends Component {

  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.onToggleOpen.bind(this);
  }


  onToggleOpen = () => {
    this.setState({showMenu: !this.state.showMenu });
  };


  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }
  
  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }
  
  handleClickOutside = (e) => {
    const menubtn = document.getElementsByClassName('btn-menu')[0];
    if (!e.path.includes(menubtn)) {
      this.setState({showMenu: false });
    }
  }


  render() {

  const {isLoggedIn, UserName, UserAvatar, UserId, onlogout} = this.props;
  const {showMenu} = this.state;

  let className = 'drop-menu';
  let classNameAvatar = 'btn btn-menu';


  if(showMenu) {
    className += ' open';
  }

  if(!UserAvatar) {
    classNameAvatar = 'btn btn-menu no-avatar';
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

                <div className={classNameAvatar} onClick={this.onToggleOpen}><img src={UserAvatar} alt={UserName} /></div>
                <div className="drop-header">
                  <Link className="user" to={`/user/${UserId}/`}>
                    <span class="user-info__nickname">{UserName}</span>
                    <span class="user-info__special">Профиль</span>
                  </Link>
        
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
  }
};
