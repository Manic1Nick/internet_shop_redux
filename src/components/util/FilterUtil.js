export default class FIlterUtil {

    static filterItems(items, filter) {
		if (!filter || Object.keys(filter).length === 0) return items
		
		let filteredItems = []
		items.forEach(item => {
			if (this.validateFilteredItem(item, filter)) filteredItems.push(item)
		})
		return filteredItems
	}

	static validateFilteredItem(item, filter) {
		for (let key in filter) {
			if (filter[key] !== item[key]) return false
		}
		return true
    }
    
    static getItemValues(items=[], key) {
        let values = []

        items.forEach(item => {
            if (!values.includes(item[key])) values.push(item[key])
        })
        return values.sort()
    }

    static validateValue(items, filter={}) {
        let result = false, 
            key = Object.keys(filter)[0]

        items.forEach(item => {
            if(item[key] && item[key] === filter[key]) result = true
        })

        return result
    }
}