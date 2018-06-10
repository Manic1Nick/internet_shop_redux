import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { ButtonToolbar, SplitButton, MenuItem, Button } from 'react-bootstrap'

import '../../styles/ItemsFilter.less'
import {
    genFilterButtonValues,
    genTitleButton,
    genStyleTitleButton,
    genFilterNames
} from '../../util/FilterUtil'

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

    renderSplitButton(filterName, i) {
        const {
            groupItems=[],
            filteredItems=[],
            addFilter=f=>f, 
            deleteFilter=f=>f
        } = this.props

        const { activeFilter } = this.state,
            filterValues = genFilterButtonValues(filterName, activeFilter, groupItems, filteredItems),
            buttonTitle = genTitleButton(filterName, activeFilter, filteredItems),
            buttonStyle = genStyleTitleButton(filterName, activeFilter)
        
        return(
            <SplitButton
                className='btn-filters'
                bsStyle={buttonStyle}
                title={buttonTitle}
                key={i}
                id={`split-button-basic-${i}`}
            >
                {
                    filterValues.map((filterValue, index) => {
                        // let isFilterValueDisabled = FilterUtil.isFilterValueDisabled(
                        //         filterName, filterValue, activeFilter, filteredItems
                        //     )

                        return(
                            <MenuItem
                                key={index}
                                className='btn-filters-values'
                                eventKey={index}
                                onSelect={ () => addFilter({ [filterName]: filterValue }) }
                                //disabled={ isFilterValueDisabled }
                            >{ filterValue }</MenuItem>
                        )
                    }
                    )
                }

                <MenuItem divider />
                <MenuItem 
                    className='btn-filters-values'
                    eventKey='100' 
                    onSelect={ () => deleteFilter([filterName]) } 
                    disabled={ filterName === 'group' }
                >clear</MenuItem>

            </SplitButton>
        )
    }

	render() {
        const { clearFiltersInGroup } = this.props,
            { activeFilter } = this.state,
            filterNames = genFilterNames(activeFilter)

		return(
			<div className='ItemsFilter'>
                <ButtonToolbar className='filter-buttons'>
                    { 
                        filterNames.map((filterName, i) => this.renderSplitButton(filterName, i))
                    }
                    <Button 
                        className='btn-clear' 
                        onClick={ () => clearFiltersInGroup() }
                    >see all in group</Button>
                </ButtonToolbar>
			</div>
		)
    }
}

ItemsFilter.propTypes = {
    filteredItems: PropTypes.array,
    groupItems: PropTypes.array,
    addFilter: PropTypes.func, 
    deleteFilter: PropTypes.func,
    clearFiltersInGroup: PropTypes.func
}

export default ItemsFilter