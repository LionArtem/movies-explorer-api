const listTechs = [
  'HTML',
  'CSS',
  'JS',
  'Ract',
  'Git',
  'Exspress.js',
  'mongoDB',
];

const listWebsite = [
  {
    title: 'Путешествие по России',
    link: 'https://lionartem.github.io/russian-travel/index.html',
  },
  { title: 'таймер', link: 'https://lionartem.github.io/timer/' },
  { title: 'форум', link: 'https://lionartem.github.io/forym/' },
  { title: 'mesto', link: 'https://mesto.add.nomoredomains.monster' },
  {
    title: 'Каталог-справочник для слесаря-ремонтника',
    link: 'https://lionartem.github.io/server_fsc',
  },
  { title: 'Какой то сайт', link: '' },
  { title: 'Какой то сайт', link: '' },
];

const deleteLikeinPage = (res, obj, moviesInPage) => {
  if (res.meta.requestStatus === 'fulfilled') {
    const movis = moviesInPage.map((element) => {
      if (element.movieId === obj.movieId) {
        return { ...element, like: !element.like };
      }
      return element;
    });
    return movis;
  }
};

export { listTechs, listWebsite, deleteLikeinPage };
