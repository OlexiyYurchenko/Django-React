export default class SwapiService {

    _apiBase = '/api';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
      };

    getAllArticle = async () => {
        const res = await this.getResource(`/articles/`);

        return res.map(this._transformArticle);
    }

    getArticle = async (id) => {
        const articles = await this.getResource(`/articles/${id}/`);
        return this._transformArticle(articles);
    }

    getArticleUser = async (id) => {
        const user = await this.getResource(`/user/1/`);
        // return user.user.map(this._transformArticle);
        return this._transformUserArticle(user); 
    }

    _transformArticle = (article) => {
        return {
            id: article.id,
            title: article.title,
            created_at: article.created_at,
            announce_text: article.announce_text,
            url: article.url,
            user: article.autor_name,
            text: article.text,
            likes: article.likes,
            dislikes: article.dislikes,
            photo_url: article.photo_url,
            comment: article.comment,
            pk_user: article.pk_user
        }
    }

    _transformUserArticle = (article) => {
        return {
            id: article.id,
            username: article.username,
            article_user: article.user
        }
    }
    
}
