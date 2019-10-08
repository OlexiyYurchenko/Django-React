import React from 'react';
import { Link } from 'react-router-dom';


const Items = (props) => {

  const { data } = props;

  const items = data.map((item) => {
    const { id, announce_text, autor_name, created_at, photo_url, pk_user, title } = item;

    return (
      
      <div className="block" key={id}> 
        <div className="title-block">
          <img src={photo_url} alt={autor_name} />
          <Link className="user-block" to={`/user/${pk_user}/`}>
            {autor_name}
          </Link>
          <span class="post__time">{created_at}</span>
        </div>
        <div className="title">
          <Link to={`/articles/${id}/`}>{title}</Link>
        </div>
        <div className="text">{ announce_text }...</div>
        <Link className="btn btn-more" to={`/articles/${id}/`}>Читать дальше →</Link>
      </div>
    );
  });
  return items
};




export default Items;