import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { ButtonToolbar, SplitButton, MenuItem, Button } from 'react-bootstrap'

import '../../styles/ItemsFilter.less'
import FilterUtil from '../../util/FilterUtil'

class ItemsFilter extends Component {

	constructor(props) {
		super(props)
		this.state = {
            activeFilter: props.activeFilter
		}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeFilter !== this.props.activeFilter) {
            this.setState({ 
                activeFilter: nextProps.activeFilter
            })
        }
    }

    renderSplitButton(key, i) {
        const { 
            filterKeys,
            filteredItems,
            updateFilter, 
            deleteFilter
        } = this.props

        const { activeFilter } = this.state,
            isFilterGroup = key === 'group',
            values = isFilterGroup 
                ? Object.keys(filterKeys) 
                : FilterUtil.getItemValues(filteredItems, key)

        let title = key, 
            styleButton = 'default'

        if (activeFilter[key]) {
            title = `${key}:${activeFilter[key]}`
            styleButton = 'warning'
        }

        if (isFilterGroup) title += ` (${filteredItems.length})`

        return(
            <SplitButton
                className='btn btn-filters'
                bsStyle={styleButton}
                title={title}
                key={i}
                id={`split-button-basic-${i}`}
            >
                {
                    values.map((value, index) =>
                        <MenuItem
                            key={index}
                            eventKey={index}
                            onSelect={ () => updateFilter({ [key]: value }) }
                            //disabled={ !FilterUtil.validateValue(filteredItems, { [key]: value }) }
                        >{ value }</MenuItem>
                    )
                }

                <MenuItem divider />
                <MenuItem 
                    eventKey='100' 
                    onSelect={ () => deleteFilter([key]) } 
                    disabled={ isFilterGroup }
                >clear</MenuItem>

            </SplitButton>
        )
    }

	render() {
        const { clearFiltersInGroup } = this.props,
            filterButtons = this._generateFilterButtons()

		return(
			<div className='ItemsFilter'>
                <ButtonToolbar>
                { 
                    filterButtons.map((key, i) => this.renderSplitButton(key, i))
                }
                </ButtonToolbar>

                <Button 
                    className='btn btn-clear' 
                    onClick={ () => clearFiltersInGroup() }
                >see all in group</Button>

			</div>
		)
    }

    _generateFilterButtons() {
        const { filterKeys } = this.props,
            { activeFilter } = this.state
        
        return [ 'group', ...filterKeys[activeFilter['group']] ]
    }
}

ItemsFilter.propTypes = {
    filterKeys: PropTypes.object,
    filteredItems: PropTypes.array,
    updateFilter: PropTypes.func, 
    deleteFilter: PropTypes.func,
    clearFiltersInGroup: PropTypes.func
}

export default ItemsFilter