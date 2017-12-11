import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import '../css/App.css';
import "antd/dist/antd.min.css"
import * as AuthActions from "./reducers/auth"
import Profile from "./profile/Profile";
import AppLayout from "./AppLayout";
import UserList from "./users/UserList";
import Skill from "./skill/Skill";
import LoginForm from "./auth/LoginForm"
import LogoutPage from "./auth/LogoutPage";

export default class App extends Component {

    componentDidMount() {
        this.props.store.dispatch(AuthActions.init());
    }

    PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={props =>
            this.props.store.getState().auth.loggedIn
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', from: props.location}}/>
        }/>
    );

    render() {
        const {PrivateRoute} = this;
        const {store} = this.props;
        return <Provider store={store}>
            <BrowserRouter>
                <AppLayout>
                    <Switch>

                        <PrivateRoute component={UserList} path="/"  exact/>
                        <PrivateRoute component={Skill} path="/skill/:id" />
                        <PrivateRoute component={Profile} path="/profiles/:id" />

                        <Route path="/login" render={props => {
                            const loggedIn = store.getState().auth.loggedIn;
                            return loggedIn ? <Redirect to="/" /> : <LoginForm />
                        }} />

                        <PrivateRoute component={LogoutPage} path="/logout"/>

                    </Switch>
                </AppLayout>
            </BrowserRouter>
        </Provider>
    }
}