import keyMirror from 'key-mirror'

export default keyMirror({
	ADD_NEW_ITEM: null,
	INCREASE_ITEM_IN_CART: null,
	DECREASE_ITEM_IN_CART: null,
	CHANGE_STOCK: null,
	DELETE_ITEM: null,
	CLEAR_CART: null,
	MAKE_ORDER: null,
	SEND_ORDER_DATA: null,
	ADD_NEW_ORDER: null,

	SENDING_SERVICE_ON: null,
	SENDING_SERVICE_OFF: null,

	ADD_ERROR: null,
	CLEAR_ERROR: null,
	CLEAR_ALL_ERRORS: null
})

export const GroupIcons = {
	"sandals": "icons/groups/sandals.png",
	"t-shirts": "icons/groups/t-shirt.png", 
	"shirts": "icons/groups/shirt.png",
	"jeans": "icons/groups/jeans.png",
	"outerwear": "icons/groups/women-long-coat.png"
}

export const MenuIcons = {
	"about": "icons/menu/about.png",
	"items": "icons/menu/items.png", 
	"terms": "icons/menu/terms.png",
	"contacts": "icons/menu/contacts.png",
	"cart_empty": "icons/menu/cart_empty.png",
	"cart_full": "icons/menu/cart_full.png"
}

export const ItemIcons = {
	"buy": "icons/item/buy.png",
	"price": "icons/item/price.png",
	"sale": "icons/item/sale.png",
	"sold": "icons/item/sold_color.png",
}

export const CartIcons = {
	"delete": "icons/cart/delete.png",
	"clear": "icons/cart/clear.png",
	"confirm": "icons/cart/confirm.png",
	"send": "icons/cart/send.png",
	"return": "icons/cart/return.png",
	"bag_empty": "icons/cart/bag_empty.png"
}