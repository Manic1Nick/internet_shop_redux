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
		match,
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
		clearFiltersInGroup=f=>f
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

	const onOpenGroup = () => {
		let index = `${match.url}`.lastIndexOf('/')
		history.push(`${match.url}`.substring(0, index))
	}
	
	const onOpenItem = (itemId) => {
		if (modalOpening) closeModal()
		history.push(`${match.url}/${itemId}`)
	}
	
	const onChangeFilter = (filter) => {
		addFilter(filter)
	}

	const onDeleteFilter = (key) => {
		deleteFilter(key)
	}

	const onClearFiltersInGroup = () => {
		clearFiltersInGroup()
	}

	const renderItem = () => 
		<div className='Item'>
			<Button bsStyle="warning" onClick={ () => onOpenGroup() }>Return to group</Button>
			<Item 
				currentItem={ selectedItem } 
				buyItem={ onBuyItem } 
			/>
		</div>

	const renderItemsGrid = () => 
		<div className='ItemsGrid'>
			<ItemsFilter 
				filter={ filter }
				itemsInStock={ itemsInStock } 
				onFilter={ onChangeFilter } 
				deleteFilter={ onDeleteFilter }
				clearFiltersInGroup={ onClearFiltersInGroup } 
			/>
			<ItemsGrid 
				items={ itemsInStock } 
				buyItem={ onBuyItem } 
				openItem={ onOpenItem }
				filter={ filter }
			/>
		</div>

	return (
		<div className='ItemsPage'>
			{ selectedItem.id ? renderItem() : renderItemsGrid() }

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
    match: PropTypes.object,
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
	clearFiltersInGroup: PropTypes.func
}

export default ItemsPage