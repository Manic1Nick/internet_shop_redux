import { Component } from 'react'
import classNames from 'classnames'
import { ButtonGroup, Button } from 'react-bootstrap'

import '../../styles/ItemCartView.less'

const ItemCartView = (props) => {
	
	const {
		item: {
			preview, id, group, name, price, inStock, inCart
		}, 
		onOpenItem=f=>f, 
		onDecrItem=f=>f, 
		onIncrItem=f=>f, 
		onDeleteItem=f=>f
	} = props

	const noItemsInCart = inCart === 0,
		noItemsInStock = inCart === (inStock + inCart),
		summItemInCart = (price * inCart)

	return (
		<tr className='ItemCartView'>

			<td className='item__preview' 
				onClick={ () => onOpenItem() }>
				<img src={ preview } />
			</td>

			<td className='item__group' 
				onClick={ () => onOpenItem() }>
				{ group }
			</td>
			
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
					bsSize="small"
					onClick={ () => onDecrItem() } 
					disabled={ noItemsInCart }
				>-</Button>	    			
				{ 
					inCart 
				}					
				<Button
					className='btn-incr' 
					bsSize="xsmall"
					onClick={ () => onIncrItem() } 
					disabled={ noItemsInStock }
				>+</Button>	    			
			</td>

			<td className='item__summ'>
				{ `$ ${summItemInCart}` }
			</td>

			<td className="btn-del" 
				onClick={ () => onDeleteItem() }
			> x </td>
				
		</tr>
	)
}

export default ItemCartView