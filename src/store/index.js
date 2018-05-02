import C from '../constants'
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import emailjs from 'emailjs-com'
import { addError, sendingServiceOn, sendingServiceOff, addNewOrder } from '../actions'

const emailServiceId = 'gmail';
const emailTemplateId = 'template_1Qy53BUZ';
const emailUserId = 'user_7YhRgyAEc5mxQKsUCNRx7';

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	let { stock, cart, filters, errors, orders } = store.getState()

	console.log(`

		base stock: ${stock.map(item => `${item.name}=${item.inStock}`)}
		stock in cart: ${cart.map(item => `${item.name}=${item.inStock}`)}
		cart: ${cart.map(item => `${item.name}=${item.inCart}`)}
		errors: ${errors.length},
		orders: ${orders}

	`)

	console.groupEnd()

	return result
}

const makeOrder = store => next => action => {

	switch(action.type) {
    	case C.MAKE_ORDER :
            store.dispatch(sendingServiceOn())

    		let { email, name, phone, message } = action.payload
        	let data = {
        	    reply_to: email,
        	    from_name: `${name} (phone: ${phone || 'no phone'})`,
        	    message_html: message
        	}

        	emailjs.init(emailUserId)
     
        	emailjs.send(emailServiceId, emailTemplateId, data)
        	.then(response => {
        	    console.log(`SUCCESS. status=${response.status}, text=${response.text}`)
                store.dispatch(sendingServiceOff()) 
                
                store.dispatch(addNewOrder(store.getState().cart, action.payload))

        	}, err => {
        	    alert(`Send email failed!\r\n Response:\n ${JSON.stringify(err)}`)
        	    console.log("FAILED. error=", err)
                store.dispatch(sendingServiceOff()) 

                store.dispatch(addError(error.message))
        	})
  	}

    return next(action)
}

export default (initialState={}) => {
	return createStore(
		appReducer, 
		initialState,
		applyMiddleware(reduxThunk, consoleMessages, makeOrder)
	)
}
