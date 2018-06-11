import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { Well, Button } from 'react-bootstrap'

import ItemPreview from './ItemPreview'
import '../../styles/ItemsGrid.less'

class ItemsGrid extends Component {

	constructor(props) {
		super()
		this.state = ({ screenSize: props.screenSize })
	}

	componentDidMount() {
		this._msnryLayout()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.screenSize !== this.props.screenSize) {
			this.setState({ screenSize: nextProps.screenSize })
			this._msnryLayout()
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.items !== this.props.items) {
			this._msnryLayout()
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

	_msnryLayout() {
		let grid = this.refs.grid,
			{ screenSize } = this.state	
			
		imagesLoaded( grid, () => {
			this.msnry = new Masonry( grid, {
				itemSelector: '.ItemPreview',
				columnWidth: screenSize === 'XS' ? 150 : 200,
				gutter: 10,
				isFitWidth: true
			})
			this.msnry.layout()
		})
	}
}

ItemsGrid.propTypes = {
	items: PropTypes.array,
	screenSize: PropTypes.string,
    buyItem: PropTypes.func, 
    openItem: PropTypes.func
}

export default ItemsGrid