import C from './constants'

export const addNewItemToCart = item => {
    return dispatch => {
        dispatch(changeStock(item, -1))

        dispatch({
            type: C.ADD_NEW_ITEM,
            item
        })        
    }
}

export const increaseItemInCart = item => {
    return dispatch => {
        dispatch(changeStock(item, -1))

        dispatch({
            type: C.INCREASE_ITEM_IN_CART,
            item
        })        
    }
}

export const decreaseItemInCart = item => {
    return dispatch => {
        dispatch(changeStock(item, 1))

        dispatch({
            type: C.DECREASE_ITEM_IN_CART,
            item
        })        
    }
}

export const deleteItemFromCart = item => {
    return dispatch => {
        dispatch(changeStock(item, item.inCart))

        dispatch({
            type: C.DELETE_ITEM,
            item
        })        
    }
}

export const deleteAllItemsFromCart = items => {
    return dispatch => {
        items.forEach(item => {
            dispatch(changeStock(item, item.inCart))            
        })

        dispatch(clearCart())        
    }
}

export const clearCart = () => ({
    type: C.CLEAR_CART
})

export const changeStock = (item, diff) => ({
    type: C.CHANGE_STOCK,
    payload: { item, diff }
})

export const makeOrder = data => ({
    type: C.MAKE_ORDER,
    payload: data
})

export const sendingServiceOn = () => ({
    type: C.SENDING_SERVICE_ON
})

export const sendingServiceOff = () => ({
    type: C.SENDING_SERVICE_OFF
})

export const addNewOrder = (itemsInCart, data) => {
    return dispatch => {
        dispatch({
            type: C.ADD_NEW_ORDER,
            payload: {
                itemsInCart, data
            }
        })     

        dispatch(clearCart())
    }
}

export const addError = message => ({
    type: C.ADD_ERROR,
    payload: message
})

export const clearError = index => ({
    type: C.CLEAR_ERROR,
    payload: index
})

export const clearAllErrors = () => ({
    type: C.CLEAR_ALL_ERRORS
})