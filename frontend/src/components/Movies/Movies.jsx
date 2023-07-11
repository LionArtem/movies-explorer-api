import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllMovies,
  isErrText,
  setValueSearch,
  selectMovies,
  setAddMoviesInPage,
  addStateTogl,
  isStateTogl,
  addShortMovies,
} from '../../redax/slices/MoviesSlice';

import { fetchGatSavedMovies } from '../../redax/slices/MoviesSavedSlice';

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
      const { togl, value } = JSON.parse(localStorage.getItem('defaultMovies'));
      dispatch(setValueSearch(value));
      dispatch(addStateTogl(togl));
    }
  }, []);

  const getMovies = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      dispatch(fetchGatSavedMovies()).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(fetchGetAllMovies());
        }
      });
    } else {
      dispatch(isErrText());
      setTimeout(() => dispatch(isErrText()), 2000);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('defaultMovies')) {
      dispatch(fetchGatSavedMovies()).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(fetchGetAllMovies());
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (moviesAll.length > 0) {
      if (stateTogl) {
        dispatch(addShortMovies());
      } else {
        dispatch(fetchGatSavedMovies()).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(fetchGetAllMovies());
          }
        });
      }
    }
  }, [stateTogl]);

  const showMoviesTogl = () => {
    dispatch(isStateTogl());
  };

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
        <FilterCheckbox stateTogl={stateTogl} isStateTogl={showMoviesTogl} />
        <MoviesCardList>
          <MoviesCard moviesInPage={moviesInPage} />
          <More moviesAll={moviesAll} moviesInPage={moviesInPage} />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
