import PropTypes from 'prop-types';
import ImageGalleryItem from "./ImageGalleryItem";
import { Gallery, Item } from "./ImageGallery.styled";

const ImageGallery = ({images, onOpenModal}) => {
    return (
        <Gallery>
            {images.map(({id, ...otherProps}) => 
                <Item key={id}>
                    <ImageGalleryItem image={otherProps} onOpenModal={onOpenModal}/>
                </Item>
            )}
        </Gallery>
    )
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),),
    onOpenModal: PropTypes.func.isRequired,
}