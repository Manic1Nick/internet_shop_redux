import { PropTypes } from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

import ListItemsInCart from './ListItemsInCart'

import '../../styles/AboutPage.less'

const ModalConfirmCheckout = (props) => {

    const {
        open,
        itemsInCart,
        openItem, 
        incrItem, 
        decrItem, 
        deleteItem, 
        onCheckout,
        closeModal
    } = props

    return (

        <Modal
            //{...this.props}
            className='ModalConfirmCheckout'
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
                    className="btn-delete"
                    bsStyle="danger"
                    onClick={ () => deleteItem(itemsInCart[itemsInCart.length - 1]) }
                >Delete last item</Button>

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

ModalConfirmCheckout.propTypes = {
    open: PropTypes.bool,
    itemsInCart: PropTypes.array,
    openItem: PropTypes.func, 
    incrItem: PropTypes.func, 
    decrItem: PropTypes.func, 
    deleteItem: PropTypes.func, 
    onCheckout: PropTypes.func,
    closeModal: PropTypes.func
}

export default ModalConfirmCheckout