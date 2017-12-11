import React from "react"
import PropTypes from "prop-types"
import {Alert, Button, Checkbox, Form, Icon, Input, Layout, Spin} from "antd";
import {bindActionCreators} from "redux";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as AuthActions from "../reducers/auth"
import "../../css/App.css"

const FormItem = Form.Item;
const {Footer} = Layout;

class LoginForm extends React.Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {email, password, remember} = values;
                this.props.login(email, password, remember)
            }
        });
    };

    
    render() {
        const {form, sendingRequest, activating} = this.props;
        const {getFieldDecorator} = form;
        return <div>
            <div className="login-header">
                <p style={{fontSize: 16}}>You're only a step away from meeting your dream team</p>
            </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>} placeholder="Email"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <NavLink className="login-form-forgot" to="/login/help">Forgot password</NavLink>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                loading={sendingRequest}>
                            Log in
                        </Button>
                    
                    </FormItem>
                </Form>
        </div>;
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    sendingRequest: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    sendingRequest: state.auth.currentlySending
});

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(AuthActions, dispatch).login,
    activateUser: bindActionCreators(AuthActions, dispatch).activateUser
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm)));
