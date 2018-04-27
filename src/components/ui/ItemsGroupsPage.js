import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Well } from 'react-bootstrap'

import '../../styles/ItemsGroupsPage.less'

const ItemsGroupsPage = ({ groups=[], addFilter=f=>f, history }) => {

    const selectGroup = (group) => {
        addFilter({ group })
        history.push(`/${group}`)
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
                        <p>{ group }</p>
                    </Well>
                )
            }
		</div>
	)
}

ItemsGroupsPage.propTypes = {
    groups: PropTypes.array,
    history: PropTypes.object,
    addFilter: PropTypes.func
}

export default ItemsGroupsPage