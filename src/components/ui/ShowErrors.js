import PropTypes from 'prop-types'
import CloseButton from 'react-icons/lib/fa/close'
import '../../styles/ShowErrors.less'

const ShowErrors = ({ errors=[], onClearError=f=>f, onClearAllErrors=f=>f }) =>
    <div className="show-errors" onDoubleClick={() => onClearAllErrors()}>
        {
            (errors.length) 
                ? errors.map((message, i) =>
                        <div key={i} className="error">
                            <p title="double click to clear all errors">{message}</p>
                            <CloseButton onClick={() => onClearError(i)}/>
                        </div>
                    ) 
                : null
        }
    </div>


ShowErrors.propTypes = {
    errors: PropTypes.array,
    onClearError: PropTypes.func,
    onClearAllErrors: PropTypes.func
}

export default ShowErrors