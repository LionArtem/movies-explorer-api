import Style from './MoviesCardList.module.scss';

export default function MoviesCardList({ children }) {
  return (
    <>
      <section className={Style.conteiner}>{children}</section>
      {window.location.pathname === '/saved-movies' && (
        <div className={Style.conteiner_saveMovies}></div>
      )}
    </>
  );
}
