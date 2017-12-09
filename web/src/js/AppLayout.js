import React from "react"
import {Layout, Menu} from "antd"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import logo from '../img/logo.png';
import {NavLink} from "react-router-dom";

const {Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const AppLayout = ({children, location}) => {

    const active = '/' + location.pathname.slice(1).split('/')[0];
    console.log(active);

    return <Layout>
        <Header className="header">
            <span className="logo">
                <img alt="Wantedly" src={logo} height={64} width={64} />
            </span>
            <Menu mode="horizontal" style={{lineHeight: '64px'}} theme="dark" selectedKeys={[active]}>
                <Menu.Item key="/"><NavLink to="/">Users</NavLink></Menu.Item>
                <Menu.Item key="/skill"><NavLink to="/skill">Skills</NavLink></Menu.Item>
            </Menu>
        </Header>
        <Layout>
            <Layout>
                <Content>
                    {children}
                </Content>

            </Layout>
        </Layout>
    </Layout>

};

export default withRouter(connect()(AppLayout))