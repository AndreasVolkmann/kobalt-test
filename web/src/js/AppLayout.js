import React from "react"
import PropTypes from "prop-types"
import {Layout, Menu} from "antd"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import logo from '../img/logo.png';
import {NavLink} from "react-router-dom";
import {ProfileAvatar} from "./profile/ProfileAvatar";

const {Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const AppLayout = ({children, location, name, email, imgUrl, loggedIn}) => {

    const active = '/' + location.pathname.slice(1).split('/')[0];
    console.log(active);

    return <Layout>
        <Header className="header">
            <span className="logo">
                <img alt="Wantedly" src={logo} height={64} width={64} />
            </span>
            <Menu mode="horizontal" style={{lineHeight: '64px'}} theme="dark" selectedKeys={[active]}>
                <Menu.Item key="/"><NavLink to="/">Users</NavLink></Menu.Item>

                {
                    loggedIn ?
                        <SubMenu className="floatRight"
                                 title={<ProfileAvatar imgUrl={imgUrl}/>}>
                            <Menu.Item key="logout"><NavLink to="/logout">Logout</NavLink></Menu.Item>
                        </SubMenu>

                        : null
                }
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

AppLayout.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    imgUrl: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    name: state.auth.name,
    email: state.auth.email,
    imgUrl: state.auth.imgUrl,
    loggedIn: state.auth.loggedIn
});

export default withRouter(connect(mapStateToProps)(AppLayout))