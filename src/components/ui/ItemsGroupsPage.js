import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Well, Badge } from 'react-bootstrap'
import { GROUP_ICONS as ICONS } from '../../constants'
import { FILTER_KEYS } from '../../constants'

import '../../styles/ItemsGroupsPage.less'

const ItemsGroupsPage = ({ itemsInStock=[], history }) => {

    const selectGroup = (group) => {
        history.push(`/${group}`)
    }

    const quantityInGroup = (group) => {    
        let itemsInGroup = itemsInStock.filter(item => group === item.group && item.inStock > 0)
        return itemsInGroup.length
    }

    const GROUPS = Object.keys(FILTER_KEYS)

	return (
		<div className='ItemsGroupsPage'>
			{
                GROUPS.map((group, index) =>
                    <Well 
                        key={ index } 
                        className='items-group' 
                        onClick={ () => selectGroup(group) }
                    >
                        <p><img src={ICONS[group]} /></p>
                        <p>{ group } <Badge>{ quantityInGroup(group) }</Badge></p>
                    </Well>
                )
            }
		</div>
	)
}

ItemsGroupsPage.propTypes = {
    itemsInStock: PropTypes.array,
    history: PropTypes.object
}

export default ItemsGroupsPage