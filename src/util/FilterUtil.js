import { FILTER_KEYS as FILTERS } from '../constants'

export function filterItems(items, filter) {
    if (!filter || Object.keys(filter).length === 0) return items
    
    let filteredItems = []
    items.forEach(item => {
        if (validateFilteredItem(item, filter)) filteredItems.push(item)
    })
    return filteredItems
}

export function validateFilteredItem(item, filter) {
    for (let key in filter) {
        if (filter[key] !== item[key]) return false
    }
    return true
}

export function getItemValues(items=[], key) {
    let values = []

    items.forEach(item => {
        if (!values.includes(item[key])) values.push(item[key])
    })
    return values.sort()
}

export function validateValue(items, filter={}) {
    let result = false, 
        key = Object.keys(filter)[0]

    items.forEach(item => {
        if(item[key] && item[key] === filter[key]) result = true
    })

    return result
}

export function genFilterNames(activeFilter) {
    const { group } = activeFilter
    
    return [ 'group', ...FILTERS[group] ]
}

export function genTitleButton(buttonName, activeFilter, filteredItems) {
    let titleButton = buttonName,
        buttonValue = activeFilter[buttonName]

    if (buttonValue) {
        titleButton = `${buttonName}:${buttonValue}`
    }
    if (buttonName === 'group') {
        titleButton += ` (${filteredItems.length})`
    }
    return titleButton
}

export function genStyleTitleButton(buttonName, activeFilter) {
    let styleButton = 'default'
    
    if (activeFilter[buttonName]) {
        styleButton = 'warning'
    }
    
    return styleButton
}

export function genFilterButtonValues(filterName, activeFilter, groupItems, filteredItems) {
    let isFilterGroupButton = filterName === 'group',
    isFilterButtonActive = activeFilter[filterName],
    filterButtonValues = []
    
    if (isFilterGroupButton) {
        filterButtonValues = Object.keys(FILTERS)
        
    } else if (isFilterButtonActive) {
        filterButtonValues = getItemValues(groupItems, filterName)
        
    } else {
        filterButtonValues = getItemValues(filteredItems, filterName)
    }
    
    return filterButtonValues
}

export function isButtonValueDisabled(buttonName, buttonValue, activeFilter, filteredItems) {
    let activeButtons = Object.keys(activeFilter),
        isLastActiveButton = activeButtons.lastIndexOf(buttonName) === activeButtons.length - 1,
        isFilterGroupButton = buttonName === 'group',
        isValueSelectalable = validateValue(filteredItems, { [buttonName]: buttonValue })    

    return !isLastActiveButton && !isFilterGroupButton && !isValueSelectalable
}

export function genFilterData(activeFilter, groupItems) {
    let filterData = { group: Object.keys(FILTERS) },
        groupKeys = FILTERS[activeFilter.group],
        groupValues = []

    groupKeys.forEach(groupKey => {
        groupValues = getItemValues(groupItems, groupKey)
        filterData[groupKey] = groupValues
    })

    return filterData
}