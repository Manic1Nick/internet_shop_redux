import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import Item from './Item'
import ItemsGrid from './ItemsGrid'
import ItemsFilter from './ItemsFilter'
import ModalConfirmCheckout from './ModalConfirmCheckout'
import FilterUtil from '../util/FilterUtil'

import '../../styles/ItemsPage.less'

class ItemsPage extends Component {

    constructor(props) {
        super(props)
		this.state = {
            filter: { 'group': props.match.params.group },
            modalConfirmCheckoutOpening: false
		}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.itemsInCart.length === 0 
                && this.state.modalConfirmCheckoutOpening) {
            this.closeModalConfirmCheckout()
        }
    }

    onChangeFilter(addingFilter) {
        let { filter } = this.state,
            newFilter = Object.assign(filter, addingFilter)
        this.setState({ filter: newFilter })
    }
    
    onDeleteFilter(key) {
        let { filter } = this.state
        delete filter[key]
        this.setState({ filter })
    }

    onClearFiltersInGroup() {
        let { filter } = this.state,
            newFilter = { 'group': filter['group'] }
        this.setState({ filter: newFilter })
    }
	
	onBuyItem = (item) => { 
        console.log('buy', item.id)
		this.props.buyItem(item)
		this.openModalConfirmCheckout()
	}
	
	onCheckout = () => {
		this.closeModalConfirmCheckout()
		this.props.history.push(`/checkout`)
	}

	onOpenGroup = () => {
        const { history, match } = this.props
		history.push(`/${match.params.group}`)
	}
	
	onOpenItem = (item) => {
        const { history, match } = this.props
		if (this.state.modalConfirmCheckoutOpening) this.closeModalConfirmCheckout()
		history.push(`${match.url}/${item.id}`)
	}
    
    openModalConfirmCheckout() {
        this.setState({ modalConfirmCheckoutOpening: true })
    }

    closeModalConfirmCheckout() {
        this.setState({ modalConfirmCheckoutOpening: false })
    }

	renderItem = (id) => {
        const { itemsInStock=[] } = this.props,
            currentItem = itemsInStock.find(item => item.id === id)

        return(
            <div className='Item'>
                <Button bsStyle="warning" onClick={ () => this.onOpenGroup() }>Return to group</Button>
                <Item 
                    currentItem={ currentItem } 
                    buyItem={ this.onBuyItem } 
                />
            </div>
        )
    }

	renderItemsGrid = () => {
        const 
            { filter } = this.state,
            { itemsInStock=[], filterKeys={} } = this.props,
            filteredItems = FilterUtil.filterItems(itemsInStock, filter)

        return(
            <div className='ItemsGrid'>
                <ItemsFilter 
                    activeFilter={ filter }
                    filterKeys={ filterKeys }
                    filteredItems={ filteredItems } 
                    updateFilter={ this.onChangeFilter.bind(this) } 
                    deleteFilter={ this.onDeleteFilter.bind(this) }
                    clearFiltersInGroup={ this.onClearFiltersInGroup.bind(this) } 
                />
                {
                    filteredItems.length > 0
                ?
                    <ItemsGrid 
                        items={ filteredItems } 
                        buyItem={ this.onBuyItem } 
                        openItem={ this.onOpenItem }
                    />				
                :
                    <div className='items-no-found'>
                        <p>There are no items in our shop by your request...</p>
                    </div>
                }
            </div>
        )
    }

    render() {

        const {
            itemsInCart=[],
            match,
            incrItem=f=>f,
            decrItem=f=>f,
            deleteItem=f=>f,
        } = this.props

        const { modalConfirmCheckoutOpening } = this.state

        return (
            <div className='ItemsPage'>
                { 
                    match.params.id 
                ? 
                    this.renderItem(parseInt(match.params.id)) 
                : 
                    this.renderItemsGrid() 
                }
    
                <ModalConfirmCheckout 
                    open={ modalConfirmCheckoutOpening }
                    itemsInCart={ itemsInCart }
                    incrItem={ incrItem }
                    decrItem={ decrItem }
                    deleteItem={ deleteItem }
                    closeModal={ this.closeModalConfirmCheckout.bind(this) } 
                    onCheckout={ this.onCheckout }
                    openItem={ this.onOpenItem }
                />
            </div>
        )
    }
}

ItemsPage.propTypes = {
    filterKeys: PropTypes.object,
    intemsInStock: PropTypes.array,
    intemsInCart: PropTypes.array,
    history: PropTypes.object,
    match: PropTypes.object
}

export default ItemsPage