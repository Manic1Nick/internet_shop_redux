import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import ItemPreview from './ItemPreview'
import '../../styles/ItemsGrid.less'

class ItemsGrid extends Component {

	componentDidMount() {
		let grid = this.refs.grid,
			width = window.innerWidth

		imagesLoaded( grid, () => {
			// init Isotope after all images have loaded
			this.msnry = new Masonry( grid, {
				itemSelector: '.ItemPreview',
				columnWidth: width > 480 ? 200 : 150,
				gutter: 10,
				isFitWidth: true
			})
			this.msnry.layout()
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.items !== this.props.items) {
			let grid = this.refs.grid
			
			imagesLoaded( grid, () => {
				this.msnry.reloadItems()
				this.msnry.layout()
			})
		}
	}
	
	render() {
		const {
			items=[],
			buyItem=f=>f,
			openItem=f=>f
		} = this.props
	
		return (
			<div className='items-grid' ref='grid'>
				{
					items.map((item, index) => 
						<ItemPreview 
							key={index}
							item={item}
							buyItem={() => buyItem(item) }
							openItem={() => openItem(item) }
						/>						
					)
				}
			</div>
		)
	}
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
    buyItem: PropTypes.func, 
    openItem: PropTypes.func
}

export default ItemsGrid