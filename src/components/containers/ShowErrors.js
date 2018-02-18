import ShowErrors from '../ui/ShowErrors'
import { clearError, clearAllErrors } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators as action } from 'redux'

const mapStateToProps = (state) => {
	return {
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClearError: action(clearError, dispatch),
		onClearAllErrors: action(clearAllErrors, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowErrors)