import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Table, Button, PageHeader } from 'react-bootstrap'

import CartUtil from '../util/CartUtil'
import ItemCartView from './ItemCartView'

import '../../styles/Cart.less'

class ListItemsInCart extends Component {

	render() {

		const {
			itemsInCart, 
			history, 
			openItem,
			incrItem, 
			decrItem, 
			deleteItem
		} = this.props

		const quantityCart = CartUtil.calcTotalQuantity(itemsInCart)
		const summCart = CartUtil.calcTotalSumm(itemsInCart)

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
								name={ item.name }
								price={ item.price }
								maxQuantity={ item.inStock + item.inCart }
								quantity={ item.inCart }
								onOpenItem={ () => openItem(item) }
								onIncrItem={ () => checkIncrItem(item) }
								onDecrItem={ () => checkDecrItem(item) }
								onDeleteItem={ () => onDeleteItem(item) }
							/>
						)
					}
					<tr>
						<td></td>
						<td className="total__name">TOTAL:</td>
						<td className="total__items">{ `${quantityCart} items` }</td>
						<td className="total__summ">{ `$ ${summCart}` }</td>
					</tr>
				</tbody>
			</Table>
		)
	}
	
}

export default ListItemsInCart