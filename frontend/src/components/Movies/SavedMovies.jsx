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
  selectSavedMovies,
  isErrText,
  isStateTogl,
  addShortMovies
} from '../../redax/slices/MoviesSavedSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SavedMovies() {
  const dispatch = useDispatch();

  const { valueSearch, errorText, stateTogl } = useSelector(selectSavedMovies);

  const searchMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(findSearchMovies());
    } else {
      dispatch(isErrText());
      setTimeout(() => dispatch(isErrText()), 2000);
    }
  };

  React.useEffect(() => {
    dispatch(addShortMovies())
  }, [stateTogl]);

  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          showMovies={searchMovies}
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
          errorText={errorText}
        />
        <FilterCheckbox stateTogl={stateTogl} isStateTogl={isStateTogl} />
        <MoviesCardList>
          <MoviesCardSaved />
        </MoviesCardList>
      </main>
      <Footer />
    </div>
  );
}
