import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image:{ webformatURL, largeImageURL, tags }, onOpenModal}) => {

        return (
        <div onClick={() => onOpenModal(largeImageURL, tags)}>
            <img src={webformatURL} alt={tags} />
        </div>
        )
    
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
}

export default ImageGalleryItem;