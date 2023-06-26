class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addMovies(objMovies) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
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

  getSavedMovies() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

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

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/movies',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { mainApi };
