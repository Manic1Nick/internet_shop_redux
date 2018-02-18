import Menu from '../ui/Menu'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        itemsInCart: state.cart
    }
}

export default connect(mapStateToProps)(Menu)