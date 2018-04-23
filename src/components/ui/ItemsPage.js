import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import Item from './Item'
import ItemsGrid from './ItemsGrid'
import ItemsFilter from './ItemsFilter'
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
		closeModal=f=>f,
		filter={},
		addFilter=f=>f,
		deleteFilter=f=>f,
		clearFilter=f=>f
	} = props
	
	if (itemsInCart.length === 0 && modalOpening) closeModal()
	
	const onBuyItem = (item) => { 
		buyItem(item)
		openModal()
	}
	
	const onCheckout = () => {
		closeModal()
		history.push(`/checkout`)
	}
	
	const onOpenItem = (itemId) => {
		if (modalOpening) closeModal()
		history.push(`/items/${itemId}`)
	}
	
	const onChangeFilter = (filter) => {
		addFilter(filter)
	}

	const onDeleteFilter = (key) => {
		deleteFilter(key)
	}

	const onClearFilter = () => {
		clearFilter()
	}

	return (
		<div className='ItemsPage'>
			<ItemsFilter 
				filter={ filter }
				itemsInStock={ itemsInStock } 
				onFilter={ onChangeFilter } 
				deleteFilter={ onDeleteFilter }
				clearFilter={ onClearFilter } 
			/>
			{
				selectedItem.id 
			? 
				<Item 
					currentItem={ selectedItem } 
					buyItem={ onBuyItem } 
				/> 
			: 
				<ItemsGrid 
					items={ itemsInStock } 
					buyItem={ onBuyItem } 
					openItem={ onOpenItem }
					filter={ filter }
				/>
			}

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
	closeModal: PropTypes.func,
	filter: PropTypes.object,
	addFilter: PropTypes.func,
	deleteFilter: PropTypes.func,
	clearFilter: PropTypes.func
}

export default ItemsPage