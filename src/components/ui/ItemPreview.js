import { Component } from 'react'
import classNames from 'classnames'

import '../../styles/ItemPreview.less'

class ItemPreview extends Component {

	render() {

		const { item={}, selected=false, exhausted=false, openItem=f=>f } = this.props

		const classes = classNames('ItemPreview', { selected, exhausted })
	
		return (
			<div className={classes} onClick={openItem}>
				<div className='name'>
					{ item.name }
				</div>
				<div className='price'>
					{`$${item.price}`}
				</div>
			</div>
		)
	}
}

export default ItemPreview