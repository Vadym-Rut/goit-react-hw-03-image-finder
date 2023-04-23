import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import * as API from 'services/Api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    imagesData: [],
    value: '',
    page: 1,
    isLoading: false,
    totalImages: 0,
    error: '',
    showModal: false,
    imageInfo: {
      largeImg: '',
      tag: '',
    },
  }

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state

    if(value === '') {
      toast.warn('The input field cannot be empty.');
      return;
    }

     if (prevState.value !== value || prevState.page !== page) {
      this.getImages(value, page);
     } 
  }

  getImages = async (query, page) => {
    this.setState({isLoading: true})
    try {
      const images = await API.getImages(query, page);
      if(images.hits.length === 0) {
        this.setState({isLoading: false});

       return toast.error('Sorry, there are no images matching your search query. Please try again.');
      }

        this.setState(state => 
        ({ imagesData: [...state.imagesData, ...images.hits],
           totalImages: images.totalHits }));
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({isLoading: false});
    }   
  }

  handleSearch = (value) => {
    if(this.state.value === value) {
      return;
    }
    this.setState({ value, page: 1, imagesData: [] });   
  } 

  onLoadMore = () => {
    this.setState(state => ({page: state.page + 1}));
  }

  onOpenModal = (largeImg, tag) => {
      this.setState({ showModal: true, imageInfo: { largeImg, tag } });
  }

  onCloseModal = () => {
    this.setState({ showModal: false, largeImg: '' });
  }

  render() {
    const { imagesData, isLoading, error, totalImages, showModal, imageInfo } = this.state;
    const totalPage = totalImages/imagesData.length;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearch}/>
        {imagesData.length > 0 && 
        (<ImageGallery images={imagesData} onOpenModal={this.onOpenModal}/>)}
        {totalPage > 1 && !isLoading && imagesData.length > 0 &&
            <Button onLoadMore={this.onLoadMore}/>}
        {showModal && <Modal onCloseModal={this.onCloseModal} imageInfo={imageInfo}/>}
        {isLoading && <Loader/>}
        {error && toast.error("Oops, an error occurred while loading the page. Please try reloading the page")}
        <ToastContainer autoClose={3000} theme="colored"/>
      </Container>
    );
  }
};

export default App;
