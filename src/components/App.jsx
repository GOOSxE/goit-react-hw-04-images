import React, { useState, useEffect } from 'react';
import { fetchImages } from '../API/Api.js';
import SearchBar from './Search-bar/Search-bar.jsx';
import ImageGallery from './Image-gallery/Image-gallery.jsx';
import ImageGalleryItem from './Image-gallery-item/Image-gallery-item.jsx';
import LoadMoreBtn from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';
import Notification from './Notification/Notification.jsx';
// *
export const App = props => {
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isModalOpen, setIsMidalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [error, setError] = useState(null);
  // ? Функція відкриття модалки ;
  const onModalOpen = data => {
    setIsMidalOpen(true);
    setLargeImageURL(data);
  };
  // ? Функція закриття модалки ;
  const onModalClose = () => {
    setIsMidalOpen(false);
    setLargeImageURL('');
  };
  // ? // Функція при сабміті форми
  const onFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  // ? // Хук useEffect що робить фетч і повертає data ;
  useEffect(() => {
    const fetchImagesData = async () => {
      if (query === null) {
        return;
      }
      if (query.trim() === '') {
        alert('Поле пошуку не може бути пустим!');
        return;
      } else {
        setIsloading('true');
        try {
          const data = await fetchImages(query, page, perPage);
          if (data.hits.length === 0) {
            alert('No images found!');
            throw new Error('No images found!');
          }
          setImages(data.hits);
          setTotalHits(data.totalHits);
          setPage(page + 1);
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setIsloading(false);
        }
      }
    };
    fetchImagesData();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps
  // ? // Функція LoadMore що завантажує більше результатів;
  const onLoadMore = async () => {
    try {
      const data = await fetchImages(query, page, perPage);
      if (page === Math.ceil(totalHits / perPage) || data.hits.length === 0) {
        setError('400');
        throw new Error('Request failed with status code 400');
      } else {
        setImages([...images, ...data.hits]);
        setPage(page + 1);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const totalPages = Math.ceil(totalHits / perPage);
  return (
    <div className="App">
      <SearchBar onSubmit={onFormSubmit} />
      {images.length === 0 && !isLoading && (
        <Notification>There is no images. Write something!</Notification>
      )}
      {error && (
        <Notification>
          Oops! Something went wrong. Please, try again!
        </Notification>
      )}
      {isLoading && <Loader />}
      {images && (
        <ImageGallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                onModalOpen={() => onModalOpen(image.largeImageURL)}
              ></ImageGalleryItem>
            );
          })}
        </ImageGallery>
      )}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onLoadMore={onLoadMore}></LoadMoreBtn>
      )}
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          onModalClose={onModalClose}
        ></Modal>
      )}
    </div>
  );
};
