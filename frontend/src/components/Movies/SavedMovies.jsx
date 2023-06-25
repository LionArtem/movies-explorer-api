import React from 'react';

import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCardSaved from './Card/MoviesCardSaved';

export default function SavedMovies() {
  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList>
          <MoviesCardSaved />
        </MoviesCardList>
      </main>
      <Footer />
    </div>
  );
}
