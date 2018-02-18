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
    	<Navbar className='Menu'>
      	  	<Navbar.Collapse>
      	  	  	<Nav className='menu-links'>
                    <LinkContainer className='menu-link' to="/about">
                        <NavItem eventKey={1} href="#">
                            About
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer className='menu-link' to="/items">
                        <NavItem eventKey={2} href="#">
                            Items
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer className='menu-link' to="/terms">
                        <NavItem eventKey={3} href="#">
                            Terms
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer className='menu-link' to="/contacts">
                        <NavItem eventKey={4} href="#">
                            Contacts
                        </NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <LinkContainer className='menu-link' to="/cart">
                        <NavItem eventKey={5} href="#">
                            Cart
                            { 
                                quantityItems > 0
                                ? <Badge className='cart__badge'>{ quantityItems }</Badge> 
                                : '' 
                            }
                        </NavItem>
                    </LinkContainer>
                </Nav>
      	  	</Navbar.Collapse>
      	</Navbar> 
    )
}

Menu.propTypes = {
    itemsInCart: PropTypes.array
}

export default Menu