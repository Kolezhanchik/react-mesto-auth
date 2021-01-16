class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _responseHandler(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error happen: ${res.status}`);
    }
  
    getInitialData() {
      return Promise.all([this.getInitialProfile(), this.getInitialCards()]);
    }
  
    getInitialCards() {
      return fetch(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(this._responseHandler);
    }
  
    getInitialProfile() {
      return fetch(`${this._url}users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._responseHandler);
    }
  
    addCard(data) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        }),
      })
      .then(this._responseHandler);
    }
  
    delCard(id) {
      return fetch(`${this._url}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((this._responseHandler));
    }
  
    addLike(id) {
      return fetch(`${this._url}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._responseHandler);
    }
  
    delLike(id) {
      return fetch(`${this._url}cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._responseHandler);
    }
  
    changeLikeCardStatus(id, isLiked) {
      if (!isLiked) {
        return this.delLike(id);
      } else {
        return this.addLike(id);
      }
    }

    setProfile(profile) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: profile.name,
          about: profile.about,
        }),
      }).then(this._responseHandler);
    }
  
    setProfileAvatar(obj) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: obj.avatar,
        }),
      })
      .then(this._responseHandler);
    }
  
  }
  
  const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
    headers: {
      authorization: 'cbe4503b-5ebe-4451-a159-203687412eb7',
      'Content-Type': 'application/json',
    }
  });

  export default api;