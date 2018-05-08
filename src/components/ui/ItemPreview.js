import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { ItemIcons as icons } from '../../constants'
import '../../styles/ItemPreview.less'

const ItemPreview = ({ item={}, buyItem=f=>f, openItem=f=>f }) => {

    const { id, name, brand, size, price, inStock, preview } = item

    const outOfStock = inStock === 0

    return(
        <div className='ItemPreview'>
            <figure className='item-pic'>
                <figcaption>
                    {`${name}`}
                </figcaption>
                <img src={preview} alt='Item image' 
                    onClick={() => openItem(id)}
                />
            </figure>

            <div className='item-info'>
                {`brand: ${brand}`}<br></br> 
                {`size: ${size}`}<br></br> 
                {`price: $${price}`}
            </div>
            
            <div className='item-actions'>
                <Button 
                    bsSize="small" 
                    bsStyle={ outOfStock ? 'default' : 'primary' }
                    disabled={ outOfStock } 
                    onClick={() => buyItem(item)}
                >{ outOfStock ? 'Sold' : 'Buy' }</Button>
            </div>
        </div>
    )
}

ItemPreview.propTypes = {
    item: PropTypes.object,
    buyItem: PropTypes.func,
    openItem: PropTypes.func
}

export default ItemPreview