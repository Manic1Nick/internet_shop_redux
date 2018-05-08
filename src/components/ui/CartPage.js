import { PropTypes } from 'prop-types'
import { Table, Button, PageHeader } from 'react-bootstrap'

import { calcTotalQuantity } from '../../util/CartUtil'
import ListItemsInCart from './ListItemsInCart'
import { CartIcons as icons } from '../../constants'

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
				<img src={icons.bag_empty} alt='Empty bag icon' />
				<p>Your cart is empty... :(</p>
			</PageHeader>
		)
	}

	const quantityCart = calcTotalQuantity(itemsInCart)

	const onClearCart = () => {
		if (confirm(`All items will be delete from your cart`)) 
			clearCart(itemsInCart)
	}

	const onOpenItem = (item) => {
		history.push(`/${item.group}/${item.id}`)
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
					className='btn btn-clear-cart'
	    			onClick={ () => onClearCart() }
	    		>
					<img src={icons.clear} alt='Clear icon' />
					Clear cart
				</Button>

				<Button
					className='btn btn-cart-to-checkout'
	    			bsStyle="success" 
	    			onClick={ () => history.push('/checkout') }
	    			disabled={ quantityCart === 0 }
	    		>
					<img src={icons.confirm} alt='Confirm icon' />
					Proceed to checkout
				</Button>
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