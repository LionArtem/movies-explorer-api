import Style from './MoviesCardList.module.scss';

export default function MoviesCardList({ children }) {
  return (
    <>
      <div className={Style.conteiner}>{children}</div>
      {window.location.pathname === '/saved-movies' && (
        <div className={Style.conteiner_saveMovies}></div>
      )}
    </>
  );
}
