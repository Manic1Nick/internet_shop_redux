import { PropTypes } from 'prop-types'
import { Table, Button, PageHeader } from 'react-bootstrap'

import { calcTotalQuantity, calcTotalSumm } from '../../util/CartUtil'
import ItemCartView from './ItemCartView'

import '../../styles/Cart.less'

const ListItemsInCart = (props) => {

	const {
		itemsInCart=[], 
		history, 
		openItem=f=>f,
		incrItem=f=>f, 
		decrItem=f=>f, 
		deleteItem=f=>f
	} = props

	const quantityCart = calcTotalQuantity(itemsInCart)
	const summCart = calcTotalSumm(itemsInCart)

	const checkIncrItem = item => {
		if (item.inStock === 0) alert(`${item.name} is no longer in stock`)
		else incrItem(item)
	}

	const checkDecrItem = item => {
		if (item.inCart === 1) onDeleteItem(item)
		else decrItem(item)
	}

	const onDeleteItem = item => {
		if (confirm(`${item.name} will be delete from your cart`)) 
			deleteItem(item)
	}

	return (

		<Table className='cart__table' responsive>
			<thead>
				<tr>
					<th className="item__preview"></th>
					<th className="item__group">Group</th>
					<th className="item__name">Name</th>
					<th className="item__price">Price</th>
					<th className="item__quantity">Quantity</th>
					<th className="item__summ">Summ</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{
					itemsInCart.map((item, index) => 
						<ItemCartView 
							key={ index }
							item={ item }
							onOpenItem={ () => openItem(item) }
							onIncrItem={ () => checkIncrItem(item) }
							onDecrItem={ () => checkDecrItem(item) }
							onDeleteItem={ () => onDeleteItem(item) }
						/>
					)
				}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td className="total__name">TOTAL:</td>
					<td className="total__items">{ `${quantityCart} items` }</td>
					<td className="total__summ">{ `$ ${summCart}` }</td>
					<td></td>
				</tr>
			</tbody>
		</Table>
	)	
}

ListItemsInCart.propTypes = {
	itemsInCart: PropTypes.array, 
	history: PropTypes.object, 
	openItem: PropTypes.func,
	incrItem: PropTypes.func, 
	decrItem: PropTypes.func, 
	deleteItem: PropTypes.func
}

export default ListItemsInCart