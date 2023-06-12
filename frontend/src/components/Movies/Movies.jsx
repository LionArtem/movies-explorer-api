import React from 'react';
import Footer from '../Footer/Footer';
import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import More from './More/More';
import { listMovies } from '../../utils/constants';

export default function Movies() {
  return (
    <div>
      <HeaderMovies />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList>
        <MoviesCard listMovies={listMovies} />
        <More />
      </MoviesCardList>
      <Footer />
    </div>
  );
}
