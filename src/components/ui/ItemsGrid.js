import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import ItemPreview from './ItemPreview'
import '../../styles/ItemsGrid.less'

class ItemsGrid extends Component {

	constructor(props) {
		super(props)
		this.state = {
			filteredItems: this._itemsFilter(props.filter)
		}
    }

	componentDidMount() {
		let grid = this.refs.grid

		this.msnry = new Masonry( grid, {
			itemSelector: '.ItemPreview',
			columnWidth: 200,
			gutter: 10,
			isFitWidth: true
		})
	}

	componentDidUpdate() {
		this.msnry.reloadItems()
		this.msnry.layout()
	}
	
	componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.props.filter) {
            this.setState({ 
				filteredItems: this._itemsFilter(nextProps.filter) 
			})
        }
    }

	render() {

		const {
            buyItem=f=>f,
			openItem=f=>f
		} = this.props

		const { filteredItems } = this.state

		return(
			<div className='items-grid' ref='grid'>
				{
					filteredItems.map((item, index) => 
						<ItemPreview 
							key={index}
							item={item}
							buyItem={buyItem}
							openItem={openItem}
						/>						
					)
				}
			</div>
		)
	}

	_itemsFilter(filter) {
		const { items } = this.props
		if (!filter || Object.keys(filter).length === 0) return items
		
		let filteredItems = []
		items.forEach(item => {
			if (this._validateFilteredItem(item, filter)) filteredItems.push(item)
		})
		return filteredItems
	}

	_validateFilteredItem(item, filter) {
		for (let key in filter) {
			if (filter[key] !== item[key]) return false
		}
		return true
	}
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
    buyItem: PropTypes.func,
	openItem: PropTypes.func,
	filter: PropTypes.object
}

export default ItemsGrid