import ItemsGroupsPage from '../ui/ItemsGroupsPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        itemsInStock: state.stock
    }
}

export default connect(mapStateToProps)(ItemsGroupsPage)