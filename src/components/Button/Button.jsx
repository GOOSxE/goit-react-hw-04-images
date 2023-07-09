import React from 'react';
import css from './Button.module.css';
import propTypes from 'prop-types';
const LoadMoreBtn = ({ onLoadMore }) => (
  <button className={css.button} type="button" onClick={onLoadMore}>
    Load more
  </button>
);
LoadMoreBtn.propTypes = {
  onLoadMore: propTypes.func.isRequired,
};
export default LoadMoreBtn;
