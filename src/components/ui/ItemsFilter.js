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
            filterKeys={},
            groupItems=[],
            filteredItems=[],
            updateFilter=f=>f, 
            deleteFilter=f=>f
        } = this.props

        const { activeFilter } = this.state,
            filterValues = genFilterButtonValues(filterName, activeFilter, filterKeys, groupItems, filteredItems),
            buttonTitle = genTitleButton(filterName, activeFilter, filteredItems),
            buttonStyle = genStyleTitleButton(filterName, activeFilter)
        
        return(
            <SplitButton
                className='btn btn-filters'
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
                                eventKey={index}
                                onSelect={ () => updateFilter({ [filterName]: filterValue }) }
                                //disabled={ isFilterValueDisabled }
                            >{ filterValue }</MenuItem>
                        )
                    }
                    )
                }

                <MenuItem divider />
                <MenuItem 
                    eventKey='100' 
                    onSelect={ () => deleteFilter([filterName]) } 
                    disabled={ filterName === 'group' }
                >clear</MenuItem>

            </SplitButton>
        )
    }

	render() {
        const { filterKeys, clearFiltersInGroup } = this.props,
            { activeFilter } = this.state,
            filterNames = genFilterNames(filterKeys, activeFilter)

		return(
			<div className='ItemsFilter'>
                <ButtonToolbar>
                { 
                    filterNames.map((filterName, i) => this.renderSplitButton(filterName, i))
                }
                </ButtonToolbar>

                <Button 
                    className='btn btn-clear' 
                    onClick={ () => clearFiltersInGroup() }
                >see all in group</Button>

			</div>
		)
    }
}

ItemsFilter.propTypes = {
    filterKeys: PropTypes.object,
    filteredItems: PropTypes.array,
    groupItems: PropTypes.array,
    updateFilter: PropTypes.func, 
    deleteFilter: PropTypes.func,
    clearFiltersInGroup: PropTypes.func
}

export default ItemsFilter