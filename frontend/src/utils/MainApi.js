class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addMovies(objMovies,token) {
    return fetch(this.baseUrl, {
      method: 'POST',
      // headers: this.headers,
      headers: {
        authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : token
        }`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        country: objMovies.country,
        director: objMovies.director,
        duration: objMovies.duration,
        year: objMovies.year,
        description: objMovies.description,
        image: objMovies.image,
        trailerLink: objMovies.trailerLink,
        nameRU: objMovies.nameRU,
        nameEN: objMovies.nameEN,
        thumbnail: objMovies.thumbnail,
        movieId: objMovies.movieId,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies(token) {
    return fetch(this.baseUrl, {
      // headers: this.headers,
      headers: {
        authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : token
        }`,
        'content-type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  deleteSaveMovies(id,token) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      // headers: this.headers,
      headers: {
        authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : token
        }`,
        'content-type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const mainApi = new MainApi({
  //baseUrl: 'http://localhost:3000/movies',
 baseUrl: 'https://api.movies.nomoredomains.rocks/movies',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { mainApi };
