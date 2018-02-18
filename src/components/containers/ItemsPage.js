import ItemsPage from '../ui/ItemsPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'
import { 
	addNewItemToCart, 
	increaseItemInCart, 
	decreaseItemInCart, 
	deleteItemFromCart, 
	deleteAllItemsFromCart, 
	openModal,
	closeModal
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
    	itemsInStock: state.stock,
        itemsInCart: state.cart,
        history: ownProps.history,
        selectedItem: state.stock.find(item => item.id === +ownProps.match.params.id),
        modalOpening: state.modals.confirmCheckoutOpening
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		buyItem: action(addNewItemToCart, dispatch),
		incrItem: action(increaseItemInCart, dispatch),
		decrItem: action(decreaseItemInCart, dispatch),
		deleteItem: action(deleteItemFromCart, dispatch),
		openModal: action(openModal, dispatch),
		closeModal: action(closeModal, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)