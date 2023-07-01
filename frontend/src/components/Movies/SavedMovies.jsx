import React from 'react';

import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCardSaved from './Card/MoviesCardSaved';

import {
  setValueSearch,
  findSearchMovies,
} from '../../redax/slices/MoviesSavedSlice';
import { useDispatch } from 'react-redux';

export default function SavedMovies() {
  const dispatch = useDispatch();

  const searchMovies = (evt) => {
    evt.preventDefault();
    dispatch(findSearchMovies());
  };

  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm showMovies={searchMovies} setValueSearch={setValueSearch} />
        <FilterCheckbox />
        <MoviesCardList>
          <MoviesCardSaved />
        </MoviesCardList>
      </main>
      <Footer />
    </div>
  );
}
