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
	closeModal,
	addFilter,
	deleteFilter,
	clearFilter
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
    	itemsInStock: state.stock,
        itemsInCart: state.cart,
        history: ownProps.history,
        selectedItem: state.stock.find(item => item.id === +ownProps.match.params.id),
		modalOpening: state.modals.confirmCheckoutOpening,
		filter: state.filters
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		buyItem: action(addNewItemToCart, dispatch),
		incrItem: action(increaseItemInCart, dispatch),
		decrItem: action(decreaseItemInCart, dispatch),
		deleteItem: action(deleteItemFromCart, dispatch),
		openModal: action(openModal, dispatch),
		closeModal: action(closeModal, dispatch),
		addFilter: action(addFilter, dispatch),
		deleteFilter: action(deleteFilter, dispatch),
		clearFilter: action(clearFilter, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)