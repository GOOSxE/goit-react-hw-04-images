import React, { useEffect } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

const Modal = ({ largeImageURL, onModalClose }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      //!! Потрібно передавати функцію на componentWillUnmount() ;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button onClick={onModalClose}>&times;</button>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  onModalClose: propTypes.func.isRequired,
};
export default Modal;
