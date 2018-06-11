import Menu from '../ui/Menu'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        itemsInCart: state.cart,
        screenSize: state.screenSize
    }
}

export default connect(mapStateToProps)(Menu)