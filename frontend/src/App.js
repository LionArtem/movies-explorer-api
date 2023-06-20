import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Profile from './components/Profile/Profile';
import Register from './components/AuthForm/Register';
import Logit from './components/AuthForm/Logit';
import NotFound from './components/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { selectRegistration } from './redax/slices/registrationSlice';

function App() {
  const { loggedIn } = useSelector(selectRegistration);
  console.log(loggedIn);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={loggedIn ? <Movies /> : <Register />} />
      <Route
        path="/saved-movies"
        element={loggedIn ? <SavedMovies /> : <Register />}
      />
      <Route path="/profile" element={loggedIn ? <Profile /> : <Register />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Logit />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
