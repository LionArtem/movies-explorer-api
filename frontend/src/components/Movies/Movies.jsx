import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllMovies,
  isErrText,
  setValueSearch,
  selectMovies,
  setAddMoviesInPage,
  addAllMovies,
  isStateTogl,
  addStateTogl
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
  const { moviesInPage, moviesAll, valueSearch, stateTogl } =
    useSelector(selectMovies);

  React.useEffect(() => {
    if (localStorage.getItem('moviesCard')) {
      dispatch(setValueSearch(localStorage.getItem('valueSearch')));
      dispatch(addAllMovies());
      dispatch(setAddMoviesInPage());
      console.log(localStorage.getItem('checkbox'));
      dispatch(addStateTogl(localStorage.getItem('checkbox')));
    }
  }, []);

  const getMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(fetchGetAllMovies());
      console.log(valueSearch);
      localStorage.setItem('valueSearch', valueSearch);
      localStorage.setItem('checkbox', stateTogl);
    } else {
      dispatch(isErrText());
      setTimeout(() => dispatch(isErrText()), 2000);
    }
  };

  return (
    <>
      <HeaderMovies />
      <main>
        <SearchForm showMovies={getMovies} setValueSearch={setValueSearch} />
        <FilterCheckbox />
        <MoviesCardList>
          <MoviesCard moviesInPage={moviesInPage} />
          <More moviesAll={moviesAll} moviesInPage={moviesInPage} />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
