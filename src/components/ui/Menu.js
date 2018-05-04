import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import '../../styles/Menu.less'

const Menu = ({ itemsInCart=[] }) => {

    let quantityItems = 0
    itemsInCart.forEach(item => {
        quantityItems += item.inCart
    })

    return (
    	<Navbar className='Menu' collapseOnSelect>
      	  	  	<Nav className='menu-links'>
                    <LinkContainer to="/about">
                        <NavItem className='menu-link'>
                            About
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/items">
                        <NavItem className='menu-link'>
                            Items
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/terms">
                        <NavItem className='menu-link'>
                            Terms
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contacts">
                        <NavItem className='menu-link'>
                            Contacts
                        </NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <LinkContainer to="/cart">
                        <NavItem className='menu-link'>
                            Cart
                            { 
                                quantityItems > 0
                                ? <Badge className='cart__badge'>{ quantityItems }</Badge> 
                                : '' 
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