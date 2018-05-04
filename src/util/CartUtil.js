export function calcTotalSumm(items) {
    return items.reduce((result, item) => {
        return result + (item.inCart * item.price)
    }, 0)
}

export function calcTotalQuantity(items) {
    return items.reduce((result, item) => {
        return result + item.inCart
    }, 0)
}

export function calcQuantityByItems(items) {
    let quantityByItems = {}
    items.forEach(item => {
        let quantityOfItem = quantityByItems[item.id]
        quantityByItems[item.id] = quantityOfItem ? quantityOfItem + 1 : 1
    })
    return quantityByItems
}

export function calcSummByItems(items) {
    let summByItems = {}
    items.forEach(item => {
        let summOfItem = summByItems[item.id]
        summByItems[item.id] = summOfItem ? summOfItem + item.price : item.price
    })
    return summByItems
}

export function createMessageForCheckout(items) {
    let summCart = this.calcTotalSumm(items),
        quantityByItems = this.calcQuantityByItems(items),
        summByItems = this.calcSummByItems(items),
        name, 
        quantity, 
        summ, 
        message = `Hello!\nI want to buy this items:\n`

    Object.keys(quantityByItems).forEach(id => {
        name = items.find(item => item.id === +id).name
        quantity = quantityByItems[id]
        summ = summByItems[id]

        message += `--- ${name}, x ${quantity}, price $${summ} \n`
    })
    message += `\nTOTAL SUMM: $ ${summCart}`

    return message
}