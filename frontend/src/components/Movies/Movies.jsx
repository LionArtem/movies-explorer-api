import React from 'react';

import Style from "./Movies.module.scss";
import {useDispatch} from "react-redux";
import {fetchGetAllMovies} from "../../redax/slices/MoviesSlice";


import Footer from '../Footer/Footer';
import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import More from './More/More';
//import { listMovies } from '../../utils/constants';

export default function Movies() {
  const dispatch= useDispatch()

  const getMovies=(evt)=>{
    evt.preventDefault()
    dispatch(fetchGetAllMovies())
  }

  return (
    <>
      <HeaderMovies />
      <main>
        <SearchForm getMovies={getMovies} />
        <FilterCheckbox />
        <MoviesCardList>
          <MoviesCard >  <button
                className={
                  'listMovies.like'
                    ? `${Style.button} ${Style.like_active}`
                    : `${Style.button} ${Style.like_off}`
                }
              ></button></MoviesCard>
          <More />
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
