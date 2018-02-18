import CartPage from '../ui/CartPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'
import { 
	increaseItemInCart, 
	decreaseItemInCart, 
	deleteItemFromCart, 
	deleteAllItemsFromCart
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
    	itemsInCart: state.cart,
    	history: ownProps.history
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		incrItem: action(increaseItemInCart, dispatch),
		decrItem: action(decreaseItemInCart, dispatch),
		deleteItem: action(deleteItemFromCart, dispatch),
		clearCart: action(deleteAllItemsFromCart, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)