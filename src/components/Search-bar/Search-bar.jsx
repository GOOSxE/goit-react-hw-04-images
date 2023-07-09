import React, { useState } from 'react';
import css from './Search-bar.module.css';
import propTypes from 'prop-types';
const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleInputChange = event => {
    setValue(event.target.value);
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };
  return (
    <header className={css.search_bar}>
      <form onSubmit={handleFormSubmit} className={css.search_form}>
        <button type="submit" className={css.button}>
          <span className={css}>Search</span>
        </button>
        <input
          className={css.input}
          onChange={handleInputChange}
          value={value}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
export default SearchBar;
