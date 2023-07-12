class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addUser(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  loginUser(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : token
        }`,
        'content-type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  patchUser(token, name, email) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : token
        }`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((err) => Promise.reject(err));
  };
}

const auth = new Auth({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.movies.nomoredomains.rocks',
  headers: { 'content-type': 'application/json' },
});

export { auth };
