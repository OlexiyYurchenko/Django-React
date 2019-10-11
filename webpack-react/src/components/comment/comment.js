import React from 'react';
import { Link } from 'react-router-dom';


const Comments = (props) => {

  const { data } = props;

  const items = data.map((item) => {
    const { id, autor_name, created_at, photo_url, pk_user, text } = item;

    return (
        <div className="card-body">
        <div className="title-block" key={id}>
            <img src={photo_url} alt={autor_name} />
            <Link className="user-block" to={`/user/${pk_user}/`} >{autor_name}</Link>
            <span className="post__time">{created_at}</span>
        </div>
        <div className="text" dangerouslySetInnerHTML={{__html: text}} />

        </div>
    )
  });

  return items
};

export default Comments;