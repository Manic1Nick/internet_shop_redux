import { PropTypes } from 'prop-types'
import { Route } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import '../../styles/ItemPreview.less'

const ItemPreview = (props) => {

    const {
        item={},
        buyItem=f=>f,
        openItem=f=>f
    } = props

    return(
        <div className='ItemPreview'>
            <figure className='item-pic'>
                <figcaption>
                    {`${item.name}`}
                </figcaption>
                <img src={item.preview} alt='Item image' 
                    onClick={() => openItem(item.id)}
                />
            </figure>
            <div className='item-info'>
                {`season: ${item.season}`}<br></br> 
                {`size: ${item.size}`}<br></br> 
                {`price: $${item.price}`}
            </div>
            <div className='item-actions'>
                <Button 
                    bsSize="small" 
                    bsStyle="primary"
                    disabled={ item.inStock === 0 } 
                    onClick={() => buyItem(item)}
                >Buy</Button>
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