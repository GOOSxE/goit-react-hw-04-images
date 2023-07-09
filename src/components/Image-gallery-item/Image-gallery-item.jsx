import React from 'react';
import css from './Image-gallery-item.module.css';
import propTypes from 'prop-types';

export default class ImageGalleryItem extends React.Component {
  render() {
    const { webformatURL, onModalOpen } = this.props;
    return (
      <li className={css.gallery_item}>
        <img
          className={css.gallery_item_image}
          src={webformatURL}
          alt=""
          onClick={onModalOpen}
          width="40px"
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  onModalOpen: propTypes.func.isRequired,
};
