import React, { Component } from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';

import { Redirect } from 'react-router-dom';

export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.onChangeSpeed = this.onChangeSpeed.bind(this);
        this.state = {
            UserName: false,
            UserAvatar: false,
            file: '',
            imagePreviewUrl: ''
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
      }
    
      _handleImageChange(e) {
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    onChangeSpeed(a, b) {
        this.props.onUser()
    }

    onEdit = (event) => {
        event.preventDefault();
        const that = this;
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
                console.log(data.user);
                console.log(data.user_avatar);
                that.onChangeSpeed(data.user, data.user_avatar)
                });  
            }
        
            }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    };

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    const { isLoggedIn } = this.props;

    
    if (!isLoggedIn) {
      return <Redirect to="/"/>;
    }

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
                <div className="row row-avatar">
                    <label >Выберите файл</label>
                    <div className="avatar-label">
                        <label className="label-down" for="file-input">Upload Image<i className="icon-download"></i></label>
                        <input className=""  id="file-input" type="file" name="file" multiple onChange={(e)=>this._handleImageChange(e)} />
                    </div>
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                </div>
            </div>
            <button>Send</button>
        </form>
      </div>
    );
  }
};


