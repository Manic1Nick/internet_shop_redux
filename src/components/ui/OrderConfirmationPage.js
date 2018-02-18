import { PageHeader } from 'react-bootstrap'

import '../../styles/OrderConfirmationPage.less'

const OrderConfirmationPage = () => {
	return (
		<PageHeader className='OrderConfirmationPage'>
			Success!
 		  	<p><small>
 		  		This is order confirmation page.<br/>
				<br/>
				Your order was send to me. Wait response on email or phone.<br/>
				For any questions please call me by phone +380667553628.<br/>
				<br/>
				Thank you! Nick :)<br/>
			</small></p>
		</PageHeader>
	)
}

export default OrderConfirmationPage