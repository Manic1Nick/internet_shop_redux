import ItemsGroupsPage from '../ui/ItemsGroupsPage'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'
import { 
	addFilter
} from '../../actions'

const mapStateToProps = (state) => {
    return {
    	groups: state.groups
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		addFilter: action(addFilter, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsGroupsPage)