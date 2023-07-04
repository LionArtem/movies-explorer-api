import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllMovies,
  isErrText,
  setValueSearch,
  selectMovies,
  setAddMoviesInPage,
  addAllMovies,
  addStateTogl,
  addShortMovies,
  isStateTogl,
} from '../../redax/slices/MoviesSlice';

import Footer from '../Footer/Footer';
import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './Card/MoviesCard';
import More from './More/More';

export default function Movies() {
  const dispatch = useDispatch();
  const { moviesInPage, moviesAll, valueSearch, stateTogl, errorText } =
    useSelector(selectMovies);

  React.useEffect(() => {
    if (localStorage.getItem('defaultMovies')) {
      const { arrMovies, togl, value } = JSON.parse(
        localStorage.getItem('defaultMovies')
      );
      dispatch(setValueSearch(value));
      dispatch(addAllMovies(arrMovies));
      dispatch(setAddMoviesInPage());
      dispatch(addStateTogl(togl));
    }
  }, []);

  const getMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(fetchGetAllMovies());
    } else {
      dispatch(isErrText());
      setTimeout(() => dispatch(isErrText()), 2000);
    }
  };


  React.useEffect(() => {
    dispatch(addShortMovies())
  }, [stateTogl]);

  return (
    <>
      <HeaderMovies />
      <main>
        <SearchForm
          showMovies={getMovies}
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
          errorText={errorText}
        />
        <FilterCheckbox stateTogl={stateTogl} isStateTogl={isStateTogl} />
        <MoviesCardList>
          <MoviesCard moviesInPage={moviesInPage} />
          <More moviesAll={moviesAll} moviesInPage={moviesInPage} />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
