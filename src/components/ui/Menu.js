import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap'
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

    return (
    	<Navbar className='Menu' collapseOnSelect>
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