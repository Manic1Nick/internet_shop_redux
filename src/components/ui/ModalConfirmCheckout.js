import { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import ListItemsInCart from './ListItemsInCart'

import '../../styles/AboutPage.less'

class ModalConfirmCheckout extends Component {

    render() {
        const {
            open,
            itemsInCart,
            openItem, 
            incrItem, 
            decrItem, 
            deleteItem, 
            onCheckout,
            closeModal
        } = this.props

        return (

            <Modal
                //{...this.props}
                bsSize="large"
                show={ open }
                onHide={ () => closeModal() }
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Your current cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ListItemsInCart 
                        itemsInCart={ itemsInCart }
                        incrItem={ incrItem }
                        decrItem={ decrItem }
                        deleteItem={ deleteItem }
                        openItem={ openItem }
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        className="btn-checkout"
                        bsStyle="success" 
                        onClick={ () => onCheckout() }
                    >Proceed to checkout</Button>

                    <Button 
                        onClick={ () => closeModal() }
                    >Continue shopping</Button>
                </Modal.Footer>
            </Modal>       

        )        
    }
}

export default ModalConfirmCheckout