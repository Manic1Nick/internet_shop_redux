import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Button, Carousel, Table } from 'react-bootstrap'

import '../../styles/Item.less'

class Item extends Component {

    render() {

        const { currentItem, onBuyItem } = this.props

        const { 
            name, 
            brand, 
            model, 
            group, 
            condition, 
            remarks, 
            price, 
            description, 
            inStock, 
            pics 
        } = currentItem

        return (
        
            <div className='Item'>
                <div className='item__data'>
                    <p>Item: {name}</p>
                    <p>Brand: {brand}</p>
                    <p>Model: {model}</p>
                    <p>Group: {group}</p>
                    <p>Condition: {condition} ({remarks})</p>
                    <p>--------------------------------------------------</p>
                    <p>Price: ${price}</p>
                    <p>Description: {description}</p>
                    <p>In stock: {inStock}</p>   

                    <p><Button
                        bsStyle="primary"
                        onClick={() => onBuyItem(currentItem) }
                        disabled={ inStock === 0 }
                    >Buy</Button></p>
                </div>

                <div className='item__pics'>
                    <Carousel>
                        {
                            currentItem.pics.map((picLink, index) =>
                                <Carousel.Item key={index} className='item__pic'>
                                    <a href={picLink}  target="_blank" >
                                        <img width={500} height={300} alt="900x500" src={picLink} />
                                        <Carousel.Caption>
                                            <h3>{currentItem.name}</h3>
                                        </Carousel.Caption>
                                    </a>
                                </Carousel.Item>                            
                            )
                        }
                    </Carousel>
                </div>
            </div>
        )        
    }
}

export default Item