import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllMovies,
  isErrText,
  setValue,
  selectMovies,
} from '../../redax/slices/MoviesSlice';

import Footer from '../Footer/Footer';
import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import More from './More/More';

export default function Movies() {
  const dispatch = useDispatch();
  const { moviesAll } = useSelector(selectMovies);
  const getMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(setValue(evt.target[0].value));
      dispatch(fetchGetAllMovies());
    } else {
      dispatch(isErrText());
      setTimeout(() => dispatch(isErrText()), 2000);
    }
  };

  return (
    <>
      <HeaderMovies />
      <main>
        <SearchForm getMovies={getMovies} />
        <FilterCheckbox />
        <MoviesCardList>
          <MoviesCard moviesAll={moviesAll} />
          <More />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
