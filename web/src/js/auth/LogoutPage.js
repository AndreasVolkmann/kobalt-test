import {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as AuthActions from "../reducers/auth";

class LogoutPage extends Component {

    componentWillMount() {
        this.props.dispatch(AuthActions.logout());
        this.props.history.replace("/");
    }

    render() {
        return null
    }

}

LogoutPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect()(withRouter(LogoutPage))