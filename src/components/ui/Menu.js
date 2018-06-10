import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { DropdownButton, MenuItem, Navbar, Nav, NavItem, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MENU_ICONS as ICONS } from '../../constants'

import '../../styles/Menu.less'

const Menu = ({ itemsInCart=[] }) => {

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

    const menuLinks = 
      	<Nav className='menu-links'>
            <LinkContainer to="/about">
                <NavItem className='menu-link'>
                    <img src={ICONS.about} alt='About icon' />
                    About
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/items">
                <NavItem className='menu-link'>
                    <img src={ICONS.items} alt='Items icon' />
                    Items
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/terms">
                <NavItem className='menu-link'>
                    <img src={ICONS.terms} alt='Terms icon' />
                    Terms
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/contacts">
                <NavItem className='menu-link'>
                    <img src={ICONS.contacts} alt='Contacts icon' />
                    Contacts
                </NavItem>
            </LinkContainer>
        </Nav>

    const menuButton =
        <DropdownButton
            className='menu-button'
            title='Menu'
            id='dropdown-basic'
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
        </DropdownButton>


    return (
    	<Navbar className='Menu' collapseOnSelect>
            { 
                window.innerWidth > 480 ? menuLinks : menuButton 
            }
            <Nav pullRight>
                <LinkContainer to="/cart">
                    <NavItem className='menu-link'>
                        { 
                            quantityItems > 0 ? cartFull : cartEmpty
                        }
                    </NavItem>
                </LinkContainer>
            </Nav>
      	</Navbar> 
    )
}

Menu.propTypes = {
    itemsInCart: PropTypes.array
}

export default Menu