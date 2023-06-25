class MoviesApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getAllMovies() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  //  addMovies(objMovies) {
  //   return fetch(this.baseUrl, {
  //     method: 'POST',
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       massege: objMovies,
  //     }),
  //   }).then(this._checkResponse);
  // }

  // getAllMessage() {
  //   return fetch(this.baseUrl, {
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  // }

  // deletePost(id) {
  //   return fetch(`${this.baseUrl}/${id}`, {
  //     method: 'DELETE',
  //   }).then(this._checkResponse);
  // }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: { 'content-type': 'application/json' },
});

export { moviesApi};
