import React from 'react';
import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.loader}>
    <Audio
      height="100"
      width="100"
      color="#000000"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  </div>
);
export default Loader;
