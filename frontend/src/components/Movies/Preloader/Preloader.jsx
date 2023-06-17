import React from 'react';
import ContentLoader from 'react-content-loader';

const Preloader = (props) => (
  <ContentLoader
    speed={1}
    width="100%"
    height="134"
    viewBox="0 0 1280 134"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="134" />
  </ContentLoader>
);

export default Preloader;
