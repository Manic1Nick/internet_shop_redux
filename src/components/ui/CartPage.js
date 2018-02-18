import { PropTypes } from 'prop-types'
import { Table, Button, PageHeader } from 'react-bootstrap'

import CartUtil from '../util/CartUtil'
import ListItemsInCart from './ListItemsInCart'

import '../../styles/Cart.less'

const CartPage = (props) => {
	
	const {
		itemsInCart=[],
		history,
		incrItem=f=>f,
		decrItem=f=>f,
		deleteItem=f=>f,
		clearCart=f=>f
	} = props

	if (itemsInCart.length === 0) {
		return (
			<PageHeader className='Cart__empty'>
				Your cart is empty... :(
			</PageHeader>
		)
	}

	const quantityCart = CartUtil.calcTotalQuantity(itemsInCart)

	const onClearCart = () => {
		if (confirm(`All items will be delete from your cart`)) 
			clearCart(itemsInCart)
	}

	const onOpenItem = itemId => {
		history.push(`/items/${itemId}`)
	}

	return (

		<div className='Cart'>

			<ListItemsInCart 
				itemsInCart={ itemsInCart }
				openItem={ onOpenItem }
				incrItem={ incrItem } 
				decrItem={ decrItem } 
				deleteItem={ deleteItem }
			/>

			<div className="cart__buttons">
				<Button 
					className="btn-clear"
	    			onClick={ () => onClearCart() }
	    		>Clear cart</Button>

				<Button 
					className="btn-checkout"
	    			bsStyle="success" 
	    			onClick={ () => history.push('/checkout') }
	    			disabled={ quantityCart === 0 }
	    		>Proceed to checkout</Button>
	  		</div>
		</div>
	)
}

CartPage.propTypes = {
	itemsInCart: PropTypes.array,
	history: PropTypes.object,
	clearCart: PropTypes.func, 
	incrItem: PropTypes.func, 
	decrItem: PropTypes.func, 
	deleteItem: PropTypes.func
}

export default CartPage