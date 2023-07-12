import React from 'react';
import { useSelector } from 'react-redux';
import Promo from './Promo/Promo';
import HeaderMain from '../HeaderMain/HeaderMain';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { selectAuth } from '../../redax/slices/authSlice';
import HeaderMovies from '../Movies/HeaderMovies/HeaderMovies';

export default function Main() {
  const { loggedIn } = useSelector(selectAuth);
  return (
    <>
      {loggedIn ? <HeaderMovies /> : <HeaderMain />}

      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
