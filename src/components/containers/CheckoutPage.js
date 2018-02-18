import CheckoutPage from '../ui/CheckoutPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'
import { makeOrder } from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
    	history: ownProps.history,
    	itemsInCart: state.cart,
    	sending: state.sendingService,
    	orders: state.orders
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		makeOrder: action(makeOrder, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)