
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {

    const {UserName, onlogout} = this.props;
    const {showMenu} = this.state;
    return (
      <div>
        <div className="btn"  onClick={this.showMenu}>
          Show menu
        </div>
        
        {
          showMenu
            ? (
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
            )
            : (
              null
            )
        }
      </div>
    );
  }
}