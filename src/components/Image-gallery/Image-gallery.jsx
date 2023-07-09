import React from 'react';
import css from './Image-gallery.module.css';
import propTypes from 'prop-types';
const ImageGallery = ({ children }) => (
  <ul className={css.gallery}>{children}</ul>
);
ImageGallery.propTypes = {
  children: propTypes.node,
};
export default ImageGallery;
