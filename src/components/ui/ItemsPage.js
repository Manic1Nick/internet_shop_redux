import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'

import ItemPreview from './ItemPreview'
import Item from './Item'
import ModalConfirmCheckout from './ModalConfirmCheckout'
import '../../styles/ItemsPage.less'

const ItemsPage = (props) => {

	const {
		itemsInStock=[],
		itemsInCart=[],
		selectedItem={}, 
		history,
		modalOpening=false,
		buyItem=f=>f,
		incrItem=f=>f,
		decrItem=f=>f,
		deleteItem=f=>f,
		openModal=f=>f,
		closeModal=f=>f
	} = props

	if (itemsInCart.length === 0 && modalOpening) closeModal()

	const onBuyItem= (item) => { 
		buyItem(item)
		openModal()
	}

	const onCheckout = () => {
		closeModal()
		history.push(`/checkout`)
	}

	const onOpenItem = (itemId) => {
		closeModal()
		history.push(`/items/${itemId}`)
	}

	return (
		<div className='ItemsPage'>
			<ul className='items'>
			{
				itemsInStock.map((item, index) => 
					<li key={index}>
						<ItemPreview 								
							item={item}
							selected={item.id === selectedItem.id}
							exhausted={item.inStock === 0}
							openItem={ () => history.push(`/items/${item.id}`) }
						/>
					</li>
				)
			}
			</ul>

			<div className='item-container'>
			{
				selectedItem.id 
					? <Item currentItem={ selectedItem } onBuyItem={ onBuyItem } />
					: null		
			}
			</div>

			<ModalConfirmCheckout 
				open={ modalOpening }
				itemsInCart={ itemsInCart }
				history={ history }
				incrItem={ incrItem }
				decrItem={ decrItem }
				deleteItem={ deleteItem }
				closeModal={ closeModal } 
				onCheckout={ onCheckout }
				openItem={ onOpenItem }
			/>
		</div>
	)
}

ItemsPage.propTypes = {
    itemsInStock: PropTypes.array,
    itemsInCart: PropTypes.array,
    history: PropTypes.object,
    selectedItem: PropTypes.object,
    modalOpening: PropTypes.bool,
    buyItem: PropTypes.func,
    incrItem: PropTypes.func, 
	decrItem: PropTypes.func, 
	deleteItem: PropTypes.func,
	openModal: PropTypes.func,
	closeModal: PropTypes.func
}

export default ItemsPage