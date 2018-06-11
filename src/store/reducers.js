import C from '../constants'
import { combineReducers } from 'redux'

export const cart = (state = [], action) => {

	let cart = state.slice(),
		index = state.indexOf(action.item), 
		prop = { inCart: 0 }

	switch (action.type) {
		case C.ADD_NEW_ITEM:
			prop.inCart = action.item.inCart ? action.item.inCart + 1 : 1
			if (index !== -1) { 
				cart[index] = Object.assign(action.item, prop)
			} else {
				cart.push(Object.assign(action.item, prop))
			}
			return cart

		case C.INCREASE_ITEM_IN_CART:
			prop.inCart = action.item.inCart + 1
			cart[index] = Object.assign(action.item, prop)
			return cart

		case C.DECREASE_ITEM_IN_CART:
			prop.inCart = action.item.inCart - 1
			if (prop.inCart > 0) {
				cart[index] = Object.assign(action.item, prop)				
			} else {
				cart.splice(index, 1)
			}
			return cart

		case C.DELETE_ITEM:
			delete action.item.inCart
			cart.splice(index, 1)
			return cart

		case C.CLEAR_CART:
			cart.forEach(item => { delete item.inCart })
			return []
	}
	return state
}

export const stock = (state = [], action) => {

	let stock = [].concat(state)

	switch (action.type) {
		case C.CHANGE_STOCK:
			let { item, diff } = action.payload
			let index = stock.indexOf(item)
			item.inStock += diff
			stock[index] = item
	}	
	return stock
}

export const filterKeys = (state = {}, action) => {

	switch (action.type) {
		default:
      		return state
	}
}

export const sendingService = (state = false, action) => {

	switch (action.type) {
		case C.SENDING_SERVICE_ON:
			return true

		case C.SENDING_SERVICE_OFF:
			return false

		default:
			return state
	}	
}

export const orders = (state = [], action) => {

	switch (action.type) {
		case C.ADD_NEW_ORDER:
			let newOrder = {
				'id': Date.now(),
				'date': new Date().toString(),
				'items': action.payload.itemsInCart,
				'client': action.payload.data
			}
			return [].concat(state, newOrder)

		default:
			return state
	}	
}

export const errors = (state = [], action) => {

	switch (action.type) {
		case C.ADD_ERROR:
			return [].concat(state, action.payload)	//return [ ..state, action.payload ]

		case C.CLEAR_ERROR:
			return state.filter((message, i) => i !== action.payload)

		case C.CLEAR_ALL_ERRORS:
			return []

		default:
			return state
	}	
}

export const screenSize = (state='', action) => {

	switch (action.type) {
		case C.SCREEN_RESIZE:
			return action.screenSize

		default:
			return state
	}
}

export default combineReducers({
	cart,
	stock,
	errors,
	filterKeys,
	sendingService,
	orders,
	screenSize
})