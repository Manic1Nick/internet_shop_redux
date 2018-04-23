import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Well, Button, Carousel, Table } from 'react-bootstrap'

import '../../styles/Item.less'

class Item extends Component {

    render() {

        const { currentItem, buyItem } = this.props

        const { 
            name, 
            brand, 
            season, 
            group, 
            condition, 
            size, 
            price, 
            description, 
            inStock, 
            pics 
        } = currentItem

        const styleEmptyStock = inStock === 0 ? { color: 'red' } : {}

        return (
        
            <Well bsSize="large" className='Item'>
                <div className='item-pics'>
                    <Carousel>
                        {
                            pics.map((picLink, index) =>
                                <Carousel.Item key={index} className='item-pic'>
                                    <a href={picLink}  target="_blank" >
                                        <img width={500} height={300} alt="item image 500x300" src={picLink} />
                                        <Carousel.Caption>
                                            <h3>{name}</h3>
                                        </Carousel.Caption>
                                    </a>
                                </Carousel.Item>                            
                            )
                        }
                    </Carousel>
                </div>

                <div className='item-info'>
                    <p>
                        <span> brand : </span>       <a href='#'>{ brand }</a> / 
                        <span> group : </span>       <a href='#'>{ group }</a> / 
                        <span> season :  </span>     <a href='#'>{ season }</a> / 
                        <span> condition : </span>   <a href='#'>{ condition }</a> / 
                        <span> size : </span>        <a href='#'>{ size }</a>
                    </p>
                    <p>Price: ${price}</p>
                    <p style={styleEmptyStock}>In stock: {inStock}</p>
                </div>

                <div className='item-actions'>
                    <Button
                        bsStyle="primary"
                        onClick={ () => buyItem(currentItem) }
                        disabled={ inStock === 0 }
                    >Buy</Button>
                </div>

            </Well>
        )        
    }
}

Item.propTypes = {
    currentItem: PropTypes.object,
    buyItem: PropTypes.func
}

export default Item