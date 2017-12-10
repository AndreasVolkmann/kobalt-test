import React, {Component} from "react"
import PropTypes from "prop-types"
import {Row, Table, List, Col, Button, Avatar, Card} from "antd"
import {NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {ProfileAvatar} from "./ProfileAvatar";
import {bindActionCreators} from "redux";
import * as ProfileActions from "../reducers/profiles";

class Profile extends Component {

    static propTypes = {
        details: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {match, fetchProfileDetails} = this.props;
        const urlId = match.params.id;
        fetchProfileDetails(urlId)
    }

    render() {
        const {match, details, fetchingDetails} = this.props;
        const urlId = match.params.id;
        const profile = details[urlId] || {};

        return <Card title={<p><ProfileAvatar profile={profile}/> {profile.name}</p>}>
            <Row>
                <Col span={8}>
                    <p style={{fontWeight: 'bold'}}>スキル・特徴</p>
                </Col>
                <Col span={8} offset={8}>
                    <Button icon="plus">スキルを推薦する</Button>
                </Col>
            </Row>
            <List itemLayout="horizontal" dataSource={profile.skills} loading={fetchingDetails} renderItem={skill => (
                <List.Item key={skill.name}>
                    <List.Item.Meta avatar={<Avatar>{skill.totalEndorsers}</Avatar>} title={<NavLink to={`/skill/${skill.id}`}>{skill.name}</NavLink>} />
                    {
                        skill.latestEndorsers.map(endo => <NavLink to={`/profiles/${endo.id}`} key={endo.id}><ProfileAvatar profile={endo} /></NavLink>)
                    }
                </List.Item>
            )} />
        </Card>
    }

}

const mapStateToProps = state => ({
    details: state.profiles.details,
    fetchingDetails: state.profiles.fetchingDetails
});

const mapDispatchToProps = dispatch => ({
    fetchProfileDetails: bindActionCreators(ProfileActions, dispatch).fetchProfileDetails
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))