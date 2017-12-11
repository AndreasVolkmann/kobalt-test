import React, {Component} from "react"
import PropTypes from "prop-types"
import {Row, Table, List, Col, Badge, Avatar, Card, Button} from "antd"
import {NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {ProfileAvatar} from "./ProfileAvatar";
import {bindActionCreators} from "redux";
import * as ProfileActions from "../reducers/profiles";
import AddSkillModal from "./AddSkillRow";

class Profile extends Component {

    static propTypes = {
        details: PropTypes.object.isRequired,
        endorse: PropTypes.func.isRequired,
        userId: PropTypes.number
    };

    state = {
        showSkillInput: false,
        skill: null
    };

    componentDidMount() {
        const {match, fetchProfileDetails} = this.props;
        const urlId = match.params.id;
        fetchProfileDetails(urlId)
    }

    changeShowSkillInput = () => this.setState(state => ({showSkillInput: !state.showSkillInput}));

    changeSkill = e => this.setState({skill: e.target.value});

    endorse = () => this.endorseThis(this.state.skill);

    endorseThis = skill => {
        const {match} = this.props;
        const urlId = match.params.id;
        this.props.endorse(skill, urlId);
    };

    render() {
        const {match, details, fetchingDetails, userId} = this.props;
        const {showSkillInput, skill} = this.state;
        const urlId = match.params.id;
        const profile = details[urlId] || {};

        const isOwn = urlId == userId;

        return <Card title={<p><ProfileAvatar profile={profile}/> {profile.name}</p>}>
            <Row>
                <Col span={8}>
                    <p style={{fontWeight: 'bold'}}>スキル・特徴</p>
                </Col>
                <Col span={8} offset={8}>
                    <AddSkillModal show={showSkillInput} changeShow={this.changeShowSkillInput}
                                   changeSkill={this.changeSkill} skill={skill} endorse={this.endorse}/>

                </Col>
            </Row>
            <List itemLayout="horizontal" dataSource={profile.skills} loading={fetchingDetails} renderItem={skill => (
                <List.Item key={skill.name}>
                    <List.Item.Meta avatar={<Avatar>{skill.totalEndorsers}</Avatar>}
                                    title={[isOwn ? null : <Button key={1} shape="circle" type="dashed" icon="plus"
                                                                   onClick={() => this.endorseThis(skill.name)}/>,
                                        <NavLink key={2} to={`/skill/${skill.id}`}>{skill.name}</NavLink>]}/>
                    {
                        skill.latestEndorsers.map(endo => <NavLink to={`/profiles/${endo.id}`}
                                                                   key={endo.id}><ProfileAvatar
                            profile={endo}/></NavLink>)
                    }
                </List.Item>
            )}/>
        </Card>
    }

}

const mapStateToProps = state => ({
    userId: state.auth.id,
    details: state.profiles.details,
    fetchingDetails: state.profiles.fetchingDetails
});

const mapDispatchToProps = dispatch => ({
    fetchProfileDetails: bindActionCreators(ProfileActions, dispatch).fetchProfileDetails,
    endorse: bindActionCreators(ProfileActions, dispatch).endorse
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))