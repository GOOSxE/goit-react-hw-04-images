import React from 'react';
import { fetchImages } from '../API/Api.js';
import SearchBar from './Search-bar/Search-bar.jsx';
import ImageGallery from './Image-gallery/Image-gallery.jsx';
import ImageGalleryItem from './Image-gallery-item/Image-gallery-item.jsx';
import LoadMoreBtn from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';
import Notification from './Notification/Notification.jsx';

export class App extends React.Component {
  state = {
    query: '',
    images: [],
    totalHits: null,
    modal: {
      isOpen: false,
      largeImageURL: '',
    },
    isLoading: false,
    page: 1,
    perPage: 12,
    error: null,
  };
  onModalOpen = data => {
    this.setState({ modal: { isOpen: true, largeImageURL: data } });
  };
  onModalClose = () => {
    this.setState({ modal: { isOpen: false, largeImageURL: '' } });
  };
  onFormSubmit = query => {
    this.setState({ query: query });
    this.setState({ page: 1 });
    this.setState({ images: [] });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.query.trim() === '') {
      alert('Input can not be empty!');
      return;
    } else if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await fetchImages(
          this.state.query,
          this.state.page,
          this.state.perPage
        );
        if (data.hits.length === 0) {
          alert('No images found!');
          throw new Error('No images found!');
        }
        this.setState({
          images: data.hits,
          totalHits: data.totalHits,
          isLoading: false,
          page: (this.state.page += 1),
        });
      } catch (error) {
        this.setState({ error: error });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onLoadMore = async () => {
    try {
      const data = await fetchImages(
        this.state.query,
        this.state.page,
        this.state.perPage
      );
      if (
        this.state.page ===
          Math.ceil(this.state.totalHits / this.state.perPage) ||
        data.hits.length === 0
      ) {
        this.setState({
          error: 400,
        });
        throw new Error('Request failed with status code 400');
      } else {
        this.setState({
          images: [...this.state.images, ...data.hits],
          page: this.state.page + 1,
        });
      }
    } catch (error) {
      this.setState({ error: error });
      console.log(error);
    }
  };
  render() {
    const { images, page, totalHits, perPage, isLoading, error, modal } =
      this.state;
    const totalPages = Math.ceil(totalHits / perPage);
    return (
      <div className="App">
        <SearchBar onSubmit={this.onFormSubmit} />
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
                  onModalOpen={() => this.onModalOpen(image.largeImageURL)}
                ></ImageGalleryItem>
              );
            })}
          </ImageGallery>
        )}
        {images.length > 0 && !isLoading && page < totalPages && (
          <LoadMoreBtn onLoadMore={this.onLoadMore}></LoadMoreBtn>
        )}
        {modal.isOpen && (
          <Modal
            largeImageURL={modal.largeImageURL}
            onModalClose={this.onModalClose}
          ></Modal>
        )}
      </div>
    );
  }
}
