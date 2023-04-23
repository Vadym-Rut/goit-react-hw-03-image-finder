import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalEl } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
            if(e.code === 'Escape') {
                this.props.onCloseModal();
            }
    }

    handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            this.props.onCloseModal();
        }
    }

    render() {
        const { largeImg, tags } = this.props.imageInfo;

        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalEl>
                    <img src={largeImg} alt={tags} />
                </ModalEl>
            </Overlay>, modalRoot
        );
    }
}

Modal.propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        largeImg: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    };

export default Modal;