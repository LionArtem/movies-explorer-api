import React from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/Movies/SavedMovies';
import Profile from './components/Profile/Profile';
import Register from './components/AuthForm/Register';
import Logit from './components/AuthForm/Logit';
import NotFound from './components/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { selectAuth, setLoggedIn } from './redax/slices/authSlice';

function App() {
  const { loggedIn, token } = useSelector(selectAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLoggedIn(true));
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={loggedIn ? <Movies /> : <Main />} />
      <Route
        path="/saved-movies"
        element={loggedIn ? <SavedMovies /> : <Main />}
      />
      <Route path="/profile" element={loggedIn ? <Profile /> : <Main />} />
      <Route path="/signup" element={loggedIn ? <Main /> : <Register />} />
      <Route path="/signin" element={loggedIn ? <Main /> : <Logit />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
