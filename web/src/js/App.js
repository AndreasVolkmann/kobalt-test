import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import '../css/App.css';
import "antd/dist/antd.min.css"
import Profile from "./profile/Profile";
import AppLayout from "./AppLayout";
import UserList from "./users/UserList";
import Skill from "./skill/Skill";

export default class App extends Component {
    render() {
        const {store} = this.props;
        return <Provider store={store}>
            <BrowserRouter>
                <AppLayout>
                    <Switch>

                        <Route path="/" component={UserList} exact/>
                        <Route path="/skill" component={Skill}/>
                        <Route path="/skill/:id" component={Skill}/>
                        <Route path="/profiles/:id" component={Profile}/>

                    </Switch>
                </AppLayout>
            </BrowserRouter>
        </Provider>
    }
}