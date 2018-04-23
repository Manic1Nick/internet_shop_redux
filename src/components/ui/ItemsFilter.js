import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { ButtonToolbar, SplitButton, MenuItem, Button } from 'react-bootstrap'

import '../../styles/ItemsFilter.less'

class ItemsFilter extends Component {

	constructor(props) {
		super(props)
		this.state = {
            filterKeys: [ 'group', 'brand', 'season', 'size', 'price' ],
            filterData: {},
			filter: props.filter
		}
    }
    
    componentDidMount() {
        const { filterKeys } = this.state
        
        let filterData= {}, values = []
        filterKeys.forEach(key => {
            values = this._getValuesMenu(key)
            Object.assign(filterData, { [key]: values })
        })
        this.setState({ filterData })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.props.filter) {
            this.setState({ filter: nextProps.filter })
        }
    }

    onChangeFilter(addingFilter) {
        this.props.onFilter(addingFilter)
    }
    
    onDeleteFilter(key) {
        this.props.deleteFilter(key)
    }

    onClearFilter() {
        this.props.clearFilter()
    }

    renderSplitButton(key, i) {
        const { filterData, filter } = this.state,
            values = Object.keys(filterData).length > 0 ? filterData[key] : []

        let title = key, styleButton = 'default'

        if (filter[key]) {
            title = `${key}:${filter[key]}`
            styleButton = 'warning'
        }

        return(
            <SplitButton
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
                            onSelect={ () => this.onChangeFilter({ [key]: value }) }
                        >{ value }</MenuItem>
                    )
                }
                <MenuItem divider />
                <MenuItem eventKey='100' onSelect={ () => this.onDeleteFilter([key]) }>clear</MenuItem>
            </SplitButton>
        )
    }

	render() {        
        const { filterKeys, filter } = this.state

		return(
			<div className='ItemsFilter'>
                <ButtonToolbar>
                { 
                    filterKeys.map((key, i) => this.renderSplitButton(key, i))
                }
                </ButtonToolbar>
                <Button className='btn-clear' onClick={ () => this.onClearFilter() }>clear all</Button>
			</div>
		)
    }
    
    _getValuesMenu(key) {
        const { itemsInStock } = this.props
        let values = []

        itemsInStock.forEach(item => {
            if (!values.includes(item[key])) values.push(item[key])
        })
        return values.sort()
    }
}

ItemsFilter.propTypes = {
    itemsInStock: PropTypes.array
}

export default ItemsFilter