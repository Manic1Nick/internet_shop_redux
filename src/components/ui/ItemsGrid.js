import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import ItemPreview from './ItemPreview'
import '../../styles/ItemsGrid.less'

class ItemsGrid extends Component {

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

export default ItemsGrid