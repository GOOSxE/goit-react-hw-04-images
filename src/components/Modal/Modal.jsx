import React from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

export default class Modal extends React.Component {
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const { onModalClose, largeImageURL } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <button onClick={onModalClose}>&times;</button>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  onModalClose: propTypes.func.isRequired,
};
