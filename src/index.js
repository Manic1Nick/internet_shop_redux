import C from './constants'
import React from 'react'
import { render } from 'react-dom'
import dataState from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { addError, screenResize } from './actions'

import { App, Whoops404 } from './components'
import { HashRouter as Router, Route } from 'react-router-dom'
import './styles/queries.scss'

const initialState = (localStorage["store-internet-shop"]) 
	? JSON.parse(localStorage["store-internet-shop"])
	: dataState
	
initialState.sendingService = false
initialState.screenSize = typeof window === 'object' ? getTypeScreen() : null

const saveState = () => 
    localStorage["store-internet-shop"] = JSON.stringify(store.getState())

const handleError = error => {
	store.dispatch(addError(error.message))
}

const handleResize = () => {
	let currentScreenSize = getTypeScreen()
	if (store.getState().screenSize !== currentScreenSize) {
		store.dispatch(screenResize(currentScreenSize))
	}
}

function getTypeScreen() {
	let width = window.innerWidth
	return width < 480 ? 'XS' : width < 768 ? 'S' : 'M'
}

const store = storeFactory(initialState)
store.subscribe(saveState)

window.React = React
window.store = store

window.addEventListener("error", handleError)
window.addEventListener("resize", handleResize)

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
  	document.getElementById('react-container')
)