import { Component } from 'react'
import classNames from 'classnames'
import { ButtonGroup, Button } from 'react-bootstrap'

import '../../styles/ItemCartView.less'

const ItemCartView = (props) => {
	
	const {
		name, 
		price, 
		quantity, 
		maxQuantity, 
		onOpenItem, 
		onDecrItem, 
		onIncrItem, 
		onDeleteItem
	} = props

	return (
		<tr className='ItemCartView'>

			<td className='item__name' 
				onClick={ () => onOpenItem() }>
				{ name }
			</td>

			<td className='item__price'>
				{ `$ ${price}` }
			</td>

			<td className='item__quantity'>					
				<Button
					className='btn-decr' 
					onClick={ () => onDecrItem() } 
					disabled={ quantity === 0 }
				>-</Button>	    			
				{ 
					quantity 
				}					
				<Button
					className='btn-incr' 
					onClick={ () => onIncrItem() } 
					disabled={ quantity === maxQuantity }
				>+</Button>	    			
			</td>

			<td className='item__summ'>
				{ `$ ${price * quantity}` }
			</td>

			<td className="btn-del" 
				onClick={ () => onDeleteItem() }
			> x </td>
				
		</tr>
	)
}

export default ItemCartView