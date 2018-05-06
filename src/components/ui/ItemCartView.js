import { Component } from 'react'
import classNames from 'classnames'
import { ButtonGroup, Button } from 'react-bootstrap'

import { CartIcons as icons } from '../../constants'

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

			<td className='item-data preview' 
				onClick={ () => onOpenItem() }>
				<img src={ preview } />
			</td>

			<td className='item-data group' 
				onClick={ () => onOpenItem() }>
				{ group }
			</td>
			
			<td className='item-data name' 
				onClick={ () => onOpenItem() }>
				{ name }
			</td>

			<td className='item-data price'>
				{ `$ ${price}` }
			</td>

			<td className='item-data quantity'>					
				<Button
					className='btn-decr' 
					bsSize="xsmall"
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

			<td className='item-data summ'>
				{ `$ ${summItemInCart}` }
			</td>

			<td className='item-data delete'
				onClick={ () => onDeleteItem() }
			>
				<img src={icons.delete} alt='Delete icon' />
			</td>
				
		</tr>
	)
}

export default ItemCartView