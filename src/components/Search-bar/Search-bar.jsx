import React from 'react';
import css from './Search-bar.module.css';
import propTypes from 'prop-types';
export default class SearchBar extends React.Component {
  state = { value: '' };
  handleInputChange = event => {
    this.setState({ value: event.target.value });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className={css.search_bar}>
        <form onSubmit={this.handleFormSubmit} className={css.search_form}>
          <button type="submit" className={css.button}>
            <span className={css}>Search</span>
          </button>
          <input
            className={css.input}
            onChange={this.handleInputChange}
            value={this.state.value}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
