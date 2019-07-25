import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import SwapiService from '../../services/swapi-service';
import { ArticlePage, LoginPage, JoinPage, ArticleAddPage } from '../pages';
import { SwapiServiceProvider} from '../swapi-service-context';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


import './app.css';


export default class App extends Component {
  state = {
    swapiService : new SwapiService(),
    isLoggedIn: false,
    UserName: false,
    OpenMenu: false
  };

  
  onToggleOpen = () => {
    this.setState({OpenMenu: !this.state.OpenMenu })
  };

  onUser = () => {
    const that = this;
    fetch('/userrr/', {
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
                UserName: data.result
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


  onArticle = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/add/', {
      method: 'POST',
      body: data,
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
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
    });
  };

  onlogout = (e) => {
    e.preventDefault();
    fetch('/logout/', {
      method: 'GET'
    })
    this.setState({
      isLoggedIn: false
    });
  };

  onLogin = (event) => {
    event.preventDefault();
    const that = this;
    const data = new FormData(event.target);
    fetch('/login/', {
      method: 'POST',
      body: data,
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        } else {
          response.json().then(function(data) {  
            console.log(data.result);
            if (data.result != 'error') {
              that.setState({
                isLoggedIn: true,
                UserName: data.result
              });
            }
          });  
        }
  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
    });
  };

  onJoin = (event) => {
    event.preventDefault();
    const that = this;
    const data = new FormData(event.target);
    fetch('/join/', {
      method: 'POST',
      body: data,
    }).then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        } else {
          response.json().then(function(data) {  
            console.log(data.result);
            if (data.result != 'error') {
              that.setState({
                isLoggedIn: true
              });
            }
          });  
        }
  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
    });
  };

  componentDidMount() {
    this.onUser()
  }



  render() {
    

    const { isLoggedIn, UserName, OpenMenu } = this.state;
    return (
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="wrapper">
              <Header isLoggedIn={isLoggedIn} UserName={UserName} OpenMenu={OpenMenu} onlogout={this.onlogout}  />
              <div className="container main">
                <Switch>
                  <Route path='/' component={ArticlePage} exact />
                  <Route path='/articles/:id?' component={ArticlePage} />
                  <Route
                      path="/login/"
                      render={() => (
                        <LoginPage
                          isLoggedIn={isLoggedIn}
                          onLogin={this.onLogin}/>
                      )}/>

                  <Route
                      path="/join/"
                      render={() => (
                        <JoinPage
                          isLoggedIn={isLoggedIn}
                          onJoin={this.onJoin}/>
                      )}/>
                  <Route
                      path="/add/"
                      render={() => (
                        <ArticleAddPage
                          onArticle={this.onArticle}/>
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
