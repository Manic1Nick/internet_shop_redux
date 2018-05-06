import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ButtonToolbar } from 'react-bootstrap'

import { CartIcons as icons } from '../../constants'

class CheckoutForm extends Component {

    constructor(props) {
        super()
        this.state = {
            email: '',
            name: '',
            phone: '',
            message: props.message
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.orders.length > prevProps.orders.length) { 
            this.props.onConfirmation()
        }
    }

    getValidationState = (controlId) => {
        return this._validateFields(controlId) 
            ? 'success' 
            : 'error'
    }

    onChange = (e) => {
        let state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }

    onCancelForm = () => {
        this.props.onCancel()
    }

    render() {

        let { email, name, phone, message } = this.state
        let textBtnSend = this.props.sendingOn ? 'Sending...' : 'Send'

        return (
        
            <form id="myform" method="post" onSubmit={ this.onSubmit }>
                <FormGroup
                    controlId="formEmail"
                    validationState={ this.getValidationState('fromEmail') }
                >
                    <ControlLabel>Your email</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        defaultValue={ email }
                        onChange={ this.onChange }
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup
                    controlId="formName"
                    validationState={ this.getValidationState('fromName') }
                >
                    <ControlLabel>Your name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        defaultValue={ name }
                        onChange={ this.onChange }
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup
                    controlId="formPhone"
                    //validationState={ this.getValidationState('fromPhone')}
                >
                    <ControlLabel>Your phone</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your phone"
                        name="phone"
                        defaultValue={ phone }
                        onChange={ this.onChange }
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup 
                    controlId="formMessage" 
                    validationState={ this.getValidationState('message') }
                >
                    <ControlLabel>Your message</ControlLabel>
                    <FormControl 
                        componentClass="textarea" 
                        placeholder="Add text to your message if you want" 
                        rows={10}
                        name="message"
                        defaultValue={ message }
                        onChange={ this.onChange }
                    />
                </FormGroup> 

                <ButtonToolbar>

                    <Button
                        onClick={ this.onCancelForm }
                    >
                        <img src={icons.return} alt='Return icon' />
                        Cancel
                    </Button> 

                    <Button 
                        className="pull-right"
                        bsStyle="success" 
                        type="submit" 
                        disabled={ !this._validateFields() }
                    >
                        <img src={icons.send} alt='Send icon' />
                        { textBtnSend }
                    </Button>   

                </ButtonToolbar>
            </form>
        )        
    }

    _validateFields = (field) => {

        const { email, name, phone, message } = this.state

        switch (field) {
            case 'fromEmail':
                return email.length > 0 && email.indexOf('@') > 0
    
            case 'fromName':
                return name.length > 0
    
            case 'message':
                return message.length > 0
    
            default:
                return email.length > 0 && email.indexOf('@') > 0
                    && name.length > 0
                    && message.length > 0
        }
    }
}

export default CheckoutForm