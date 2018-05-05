import { PropTypes } from 'prop-types'
import { Well, Button, Carousel, Table } from 'react-bootstrap'

import { ItemIcons as icons } from '../../constants'
import '../../styles/Item.less'

const Item = (props) => {

    const { currentItem, buyItem, updateFilter, filterKeys } = props

    const { 
        id,
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

    //const styleEmptyStock = inStock === 0 ? { color: 'red' } : {}

    const itemKeys = [ 'group', ...filterKeys[group] ]

    const inStockInfo = inStock === 0 ? <img src={icons.sold} alt='Sold icon' /> : <p>in stock: {inStock}</p>

    const buttonBuy = 
        <div className='item-actions'>
            <Button
                bsStyle="primary"
                className='btn buy-item'
                onClick={ () => buyItem(currentItem) }
                disabled={ inStock === 0 }
            >
                <img src={icons.buy} alt='Buy icon' />
                Buy
            </Button>
        </div>

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
                <div className='item-keys-values'>
                    <span> id: { id } </span>
                    {
                        itemKeys.map((key, index) => 
                            <span className='item-key-value' key={index}>
                                { key } : 
                                    <Button 
                                        bsStyle="link"
                                        onClick={ () => onFilter({ [key]: currentItem[key] }) }
                                    >{ key === 'price' ? `$${currentItem[key]}` : currentItem[key] }</Button>                                
                            </span>
                        )
                    }
                    { buttonBuy }
                </div>

                <div className='item-in-stock'>{ inStockInfo }</div>
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