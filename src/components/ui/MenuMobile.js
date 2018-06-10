import { PropTypes } from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { ButtonToolbar, SplitButton, MenuItem, Button, Navbar, Nav, NavItem, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MENU_ICONS as ICONS } from '../../constants'

const MenuMobile = ({ itemsInCart=[] }) => {

    let quantityItems = 0
    itemsInCart.forEach(item => {
        quantityItems += item.inCart
    })

    const cartEmpty = 
        <div>
            <img src={ICONS.cart_empty} alt='Cart empty icon' />
            Cart
        </div>

    const cartFull = 
        <div>
            <img src={ICONS.cart_full} alt='Cart full icon' />
            Cart
            <Badge className='cart__badge'>{ quantityItems }</Badge>
        </div>

    return (
    	<SplitButton
            className='btn-menu-mobile'
            title='Menu'
            //key={i}
            //id={`split-button-basic-${i}`}
        >
            <LinkContainer to="/about">
                <MenuItem className='menu-link'>
                    <img src={ICONS.about} alt='About icon' />
                    About
                </MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/items">
                <MenuItem className='menu-link'>
                    <img src={ICONS.items} alt='Items icon' />
                    Items
                </MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/terms">
                <MenuItem className='menu-link'>
                    <img src={ICONS.terms} alt='Terms icon' />
                    Terms
                </MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/contacts">
                <MenuItem className='menu-link'>
                    <img src={ICONS.contacts} alt='Contacts icon' />
                    Contacts
                </MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/cart">
                <MenuItem className='menu-link'>
                    { 
                        quantityItems > 0 ? cartFull : cartEmpty
                    }
                </MenuItem>
            </LinkContainer>
        </SplitButton>
    )
}

MenuMobile.propTypes = {
    itemsInCart: PropTypes.array
}

export default MenuMobile