import React, { Component } from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';

import { Link } from 'react-router-dom';

export default class UserPage extends Component {

    onEdit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/request/edituser/', {
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

  render() {


    return (
      <div className="popup">
        <div class="popup-box__title">Edit Profile</div>
        <form onSubmit={this.onEdit} encType="multipart/form-data">
            <DjangoCSRFToken/>
            <div>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input className="input" id="name" name="name" type="text" />
                </div>
                <div className="row">
                    <label for="file-input">Выберите файл</label>
                    <input className="input" id="file-input" type="file" name="file" multiple />
                </div>
            </div>
            <button>Send</button>
        </form>
      </div>
    );
  }
};
