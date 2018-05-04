import { PropTypes } from 'prop-types'
import { Well, Button, Carousel, Table } from 'react-bootstrap'

import '../../styles/Item.less'

const Item = (props) => {

    const { currentItem, buyItem, updateFilter, filterKeys } = props

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

    const onFilter = (filter) => {
        filter.group = group
        updateFilter(filter)
    }

    const styleEmptyStock = inStock === 0 ? { color: 'red' } : {}

    const itemKeys = [ 'group', ...filterKeys[group] ]

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
                    {
                        itemKeys.map((key, index) => 
                            <span key={index}>
                                <span> { key } : </span>
                                <Button 
                                    bsStyle="link" 
                                    onClick={ () => onFilter({ [key]: currentItem[key] }) }
                                >{ currentItem[key] }</Button>
                            </span>
                        )
                    }
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

Item.propTypes = {
    currentItem: PropTypes.object,
    filterKeys: PropTypes.object,
    buyItem: PropTypes.func,
    updateFilter: PropTypes.func
}

export default Item