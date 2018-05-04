import { Well, Button, Pager } from 'react-bootstrap'

import Item from './Item'

import '../../styles/ItemPage.less'

const ItemPage = (props) => {

    const { 
        currentItem={}, 
        prevItem, 
        nextItem, 
        filterKeys={}, 
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
                filterKeys={ filterKeys }
                buyItem={ buyItem } 
                updateFilter={ updateFilter }
            />
        </div>
    )
}

export default ItemPage