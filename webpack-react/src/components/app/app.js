import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import SwapiService from '../../services/swapi-service';
import { ArticlePage, LoginPage, JoinPage, ArticleAddPage, UserPage } from '../pages';
import { SwapiServiceProvider} from '../swapi-service-context';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


import './app.css';


export default class App extends Component {
  state = {
    swapiService : new SwapiService(),
    isLoggedIn: false,
    UserName: false,
    OpenMenu: false,
    UserAvatar: false,
    UserId: false
  };
  
  onUser = () => {
    const that = this;
    fetch('/request/user/', {
      method: 'GET'
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        } else {
          response.json().then(function(data) {  
            if(data.result != 'AnonymousUser') {
              that.setState({
                isLoggedIn: true,
                UserName: data.user,
                UserAvatar: data.user_avatar,
                UserId: data.id
              });
            };
          });  
        }
  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
    });
  };


  onlogout = (e) => {
    e.preventDefault();
    fetch('/request/logout/', {
      method: 'GET'
    })
    this.setState({
      isLoggedIn: false
    });
  };

  componentDidMount() {
    this.onUser()
  }



  render() {

    

    const { isLoggedIn, UserName, OpenMenu, UserAvatar, UserId } = this.state;
    let className = 'wrapper';

    if (!isLoggedIn) {
      className += ' guest'
    }

    return (
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className={className}>
              <Header isLoggedIn={isLoggedIn} UserName={UserName} OpenMenu={OpenMenu} UserAvatar={UserAvatar} UserId={UserId} onlogout={this.onlogout}  />
              <div className="container main">
                <Switch>
                  <Route path='/' component={ArticlePage} exact />
                  <Route path='/articles/:id?' 
                      render={() => (
                        <ArticlePage isLoggedIn={isLoggedIn}/> 
                      )}/> 
                  <Route
                      path="/login/"
                      render={() => (
                        <LoginPage
                          isLoggedIn={isLoggedIn}
                          onUser={this.onUser}/>
                      )}/>

                  <Route
                      path="/join/"
                      render={() => (
                        <JoinPage
                          isLoggedIn={isLoggedIn}
                          onUser={this.onUser}/>
                      )}/>
                  <Route
                      path="/add/"
                      render={() => (
                        <ArticleAddPage
                          isLoggedIn={isLoggedIn} />
                      )}/>
                  <Route
                      exact
                      path="/settings/"
                      render={() => (
                        <UserPage 
                        UserName={UserName}  UserAvatar={UserAvatar} isLoggedIn={isLoggedIn} UserId={UserId} onUser={this.onUser}  />
                      )}/>
                  <Route
                      path="/user/:id?"
                      render={() => (
                        <ArticlePage UserId={UserId} /> 
                      )}/> 
                  <Route render={() => <h2>Page not found</h2>} />
                </Switch>
              </div>
              <Footer isLoggedIn={isLoggedIn} />
            </div>
          </Router>
        </SwapiServiceProvider>
    );
  }
}
