import ItemsGroupsPage from '../ui/ItemsGroupsPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        groups: Object.keys(state.filterKeys),
        itemsInStock: state.stock
    }
}

export default connect(mapStateToProps)(ItemsGroupsPage)