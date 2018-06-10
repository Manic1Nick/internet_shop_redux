import { PropTypes } from 'prop-types'
import { Well, Button, Pager } from 'react-bootstrap'

import Item from './Item'

import '../../styles/ItemPage.less'

const ItemPage = (props) => {

    const { 
        currentItem={}, 
        prevItem, 
        nextItem, 
        openItem=f=>f, 
        openGroup=f=>f, 
        updateFilter=f=>f, 
        buyItem=f=>f
    } = props

    return(
        <div className='Item'>
            <div className='action-buttons'>
                <Pager>
                    <Pager.Item href="#" 
                        className='btn-return'
                        onClick={ () => openGroup(currentItem.group) }
                    >Return to group</Pager.Item>
                </Pager>

                <Pager>
                    <Pager.Item href="#" 
                        className='btn-prev'
                        onClick={ () => openItem(prevItem) }
                        disabled={ !prevItem }
                    >Previous</Pager.Item>
                    {' '}
                    <Pager.Item href="#"
                        className='btn-next'
                        onClick={ () => openItem(nextItem) }
                        disabled={ !nextItem }
                    >Next</Pager.Item>
                </Pager>
            </div>

            <Item 
                currentItem={ currentItem } 
                buyItem={ buyItem } 
                updateFilter={ updateFilter }
            />
        </div>
    )
}

ItemPage.propTypes = {
    currentItem: PropTypes.object, 
    prevItem: PropTypes.object, 
    nextItem: PropTypes.object, 
    openItem: PropTypes.func, 
    openGroup: PropTypes.func, 
    updateFilter: PropTypes.func, 
    buyItem: PropTypes.func
}

export default ItemPage