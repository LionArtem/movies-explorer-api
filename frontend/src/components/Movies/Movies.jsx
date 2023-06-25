import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllMovies,
  isErrText,
  setValue,
  selectMovies,
  setAddMoviesInPage,
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
  const { moviesInPage, moviesAll, value } = useSelector(selectMovies);

  React.useEffect(() => {
    if (localStorage.getItem('moviesCard')) {
      dispatch(setValue(localStorage.getItem('valueSearch')));
      // dispatch(fetchGetAllMovies());
      dispatch(
        setAddMoviesInPage(JSON.parse(localStorage.getItem('moviesCard')))
      );
    }
  }, []);

  const getMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(fetchGetAllMovies());
      localStorage.setItem('valueSearch', value);
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
          <MoviesCard moviesInPage={moviesInPage} />
          <More moviesAll={moviesAll} moviesInPage={moviesInPage} />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
