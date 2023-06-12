import React from 'react';
import HeaderMovies from '../Movies/HeaderMovies/HeaderMovies';
import SearchForm from '../Movies/SearchForm/SearchForm';
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import { listMovies } from '../../utils/constants';

export default function SavedMovies() {
  return (
    <div>
      <HeaderMovies />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList>
        <MoviesCard listMovies={listMovies}/>
      </MoviesCardList>
      <Footer />
    </div>
  );
}
