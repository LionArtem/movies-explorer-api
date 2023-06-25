import React from 'react';
import Style from './More.module.scss';

export default function More({ moviesAll }) {
  return (
    <div className={Style.conteiner}>
      {moviesAll.length > 0 ? (
        <div>
          <p>Ещё</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
