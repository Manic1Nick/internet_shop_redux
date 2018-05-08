import { PropTypes } from 'prop-types'
import emailjs from 'emailjs-com'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ButtonToolbar } from 'react-bootstrap'
import CheckoutForm from './CheckoutForm'
import { createMessageForCheckout } from '../../util/CartUtil'

import '../../styles/CheckoutPage.less';

const emailServiceId = 'gmail';
const emailTemplateId = 'template_1Qy53BUZ';
const emailUserId = 'user_7YhRgyAEc5mxQKsUCNRx7';

const CheckoutPage = ({ history, orders=[], itemsInCart=[], makeOrder=f=>f, updateItems=f=>f, sending=false }) => {

    let baseMessage = createMessageForCheckout(itemsInCart)

    const cancelOrder = () => {
        history.push(`/items`)
    }

    const confirmationOrder = () => {
        history.push(`/confirmation`)
    }

    return (
            <div className='CheckoutPage'>
                <h2 className='checkout__title'>
                    Checkout page
                </h2>

                <CheckoutForm 
                    message={ baseMessage }
                    onSubmit={ makeOrder }
                    sendingOn={ sending }
                    orders={ orders }
                    onCancel={ () => cancelOrder() }
                    onConfirmation={ () => confirmationOrder() }
                />
            </div>
        )
}

CheckoutPage.propTypes = {
    history: PropTypes.object,
    orders: PropTypes.array,
    itemsInCart: PropTypes.array,
    makeOrder: PropTypes.func,
    updateItems: PropTypes.func,
    sending: PropTypes.bool
}

export default CheckoutPage

