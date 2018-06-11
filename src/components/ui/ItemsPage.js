import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button, Pager } from 'react-bootstrap'

import ItemPage from './ItemPage'
import ItemsGrid from './ItemsGrid'
import ItemsFilter from './ItemsFilter'
import ModalConfirmCheckout from './ModalConfirmCheckout'

import { filterItems } from '../../util/FilterUtil'

import '../../styles/ItemsPage.less'

class ItemsPage extends Component {

    constructor(props) {
        super(props)
		this.state = {
            filter: { group: props.match.params.group },
            filteredItems: [],
            modalConfirmCheckoutOpening: false
		}
    }

    componentDidMount() {
        const { itemsInStock } = this.props,
            { filter } = this.state
        this.setState({
            filteredItems: filterItems(itemsInStock, filter)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.itemsInCart.length === 0 
                && this.state.modalConfirmCheckoutOpening) {
            this.closeModalConfirmCheckout()
        }
    }

    addFilter(addingFilter) {
        let { filter } = this.state,
            newFilter = addingFilter

        if (addingFilter.group) this.onOpenGroup(addingFilter.group)
        else newFilter = Object.assign(filter, addingFilter)
        
        this.updateFilter(newFilter)
    }
    
    onDeleteFilter(key) {
        let { filter } = this.state
        delete filter[key]
        this.updateFilter(filter)
    }

    onClearFiltersInGroup() {
        let { group } = this.state.filter
        this.updateFilter({ group })
    }

    updateFilter(filter) {
        const { itemsInStock } = this.props,
            filteredItems = filterItems(itemsInStock, filter)
        
        this.setState({ filter, filteredItems })
        this.onOpenGroup(filter.group)
    }
	
	onBuyItem = (item) => { 
		this.props.buyItem(item)
		this.openModalConfirmCheckout()
	}
	
	onCheckout = () => {
		this.closeModalConfirmCheckout()
		this.props.history.push(`/checkout`)
	}

	onOpenGroup = (group) => {
        const { history, match } = this.props

        if (!match.url.endsWith(group)) {
            history.push(`/${group}`)
        }
	}
	
	onOpenItem = (item) => {
        this.closeModalConfirmCheckout()
        
        const { history, match } = this.props
        if (match.params.id) history.push(`${item.id}`)
        else history.push(`${match.url}/${item.id}`)
    }

    openModalConfirmCheckout() {
        this.setState({ modalConfirmCheckoutOpening: true })
    }

    closeModalConfirmCheckout() {
        this.setState({ modalConfirmCheckoutOpening: false })
    }

	renderItem = () => {
        const { filteredItems } = this.state,
            { itemsInCart, itemsInStock, match } = this.props
        
        let itemsOnPage = filteredItems.length > 0 ? filteredItems : itemsInCart.length > 0 ? itemsInCart : itemsInStock,
            currentItem = itemsOnPage.find(item => item.id === parseInt(match.params.id)),   
            prevItem = itemsOnPage[itemsOnPage.indexOf(currentItem) - 1],
            nextItem = itemsOnPage[itemsOnPage.indexOf(currentItem) + 1]
            
        return(
            <ItemPage 
                currentItem={ currentItem }
                prevItem={ prevItem }
                nextItem={ nextItem }
                openItem={ this.onOpenItem }
                openGroup={ this.onOpenGroup }
                updateFilter={ this.updateFilter.bind(this) }
                buyItem={ this.onBuyItem } 
            />
        )
    }

	renderItemsGrid = () => {
        const 
            { filter, filteredItems } = this.state,
            { itemsInStock=[], screenSize=0 } = this.props,
            groupItems = itemsInStock.filter(item => item.group === filter.group)

        return(
            <div className='ItemsGrid'>
                <ItemsFilter 
                    activeFilter={ filter }
                    groupItems={ groupItems }
                    filteredItems={ filteredItems } 
                    addFilter={ this.addFilter.bind(this) } 
                    deleteFilter={ this.onDeleteFilter.bind(this) }
                    clearFiltersInGroup={ this.onClearFiltersInGroup.bind(this) } 
                />
                {
                    filteredItems.length > 0
                ?
                    <ItemsGrid 
                        items={ filteredItems } 
                        screenSize={ screenSize }
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
                    this.renderItem() 
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
    intemsInStock: PropTypes.array,
    intemsInCart: PropTypes.array,
    history: PropTypes.object,
    match: PropTypes.object
}

export default ItemsPage