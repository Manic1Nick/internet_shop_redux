import ItemsPage from '../ui/ItemsPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'
import { 
	addNewItemToCart, 
	increaseItemInCart, 
	decreaseItemInCart, 
	deleteItemFromCart
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
    	itemsInStock: state.stock,
		itemsInCart: state.cart,
		history: ownProps.history,
		match: ownProps.match
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		buyItem: action(addNewItemToCart, dispatch),
		incrItem: action(increaseItemInCart, dispatch),
		decrItem: action(decreaseItemInCart, dispatch),
		deleteItem: action(deleteItemFromCart, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)