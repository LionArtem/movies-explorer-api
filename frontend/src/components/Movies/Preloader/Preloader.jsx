import React from 'react';
import ContentLoader from 'react-content-loader';

const Preloader = (props) => (
  <ContentLoader
    speed={1}
    max-width={1280}
    height={140}
    viewBox="0 0 1280 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="140" />
  </ContentLoader>
);

export default Preloader;
