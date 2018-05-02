import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Well, Badge } from 'react-bootstrap'

import '../../styles/ItemsGroupsPage.less'

const ItemsGroupsPage = ({ groups=[], itemsInStock=[], history }) => {

    const selectGroup = (group) => {
        history.push(`/${group}`)
    }

    const quantityInGroup = (group) => {    
        let itemsInGroup = itemsInStock.filter(item => group === item.group && item.inStock > 0)
        return itemsInGroup.length
    }

	return (
		<div className='ItemsGroupsPage'>
			{
                groups.map((group, index) =>
                    <Well 
                        key={ index } 
                        className='items-group' 
                        onClick={ () => selectGroup(group) }
                    >
                        <p>{ group } <Badge>{ quantityInGroup(group) }</Badge></p>
                    </Well>
                )
            }
		</div>
	)
}

ItemsGroupsPage.propTypes = {
    groups: PropTypes.array,
    itemsInStock: PropTypes.array,
    history: PropTypes.object
}

export default ItemsGroupsPage