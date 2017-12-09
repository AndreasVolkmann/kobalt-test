import React, {Component} from "react"
import {Row, Table, List, Col, Button, Avatar, Card} from "antd"
import {NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import DemoProfiles from "../data/DemoProfiles";
import {ProfileAvatar} from "./ProfileAvatar";

class Profile extends Component {


    render() {
        const {match} = this.props;
        const urlId = match.params.id;
        const profiles = DemoProfiles;
        const profile = profiles.find(p => p.id == urlId);

        return <Card title={<p><ProfileAvatar profile={profile}/> {profile.name}</p>}>
            <Row>
                <Col span={8}>
                    <p style={{fontWeight: 'bold'}}>スキル・特徴</p>
                </Col>
                <Col span={8} offset={8}>
                    <Button icon="plus">スキルを推薦する</Button>
                </Col>
            </Row>
            <List itemLayout="horizontal" dataSource={profile.skills} renderItem={skill => (
                <List.Item key={skill.name}>
                    <List.Item.Meta avatar={<Avatar>{skill.endorsers.length}</Avatar>} title={skill.name} />
                    {
                        skill.endorsers.map(endo => <NavLink to={`/profiles/${endo.id}`} key={endo.id}><ProfileAvatar profile={endo} /></NavLink>)
                    }
                </List.Item>
            )} />
        </Card>
    }

}

export default withRouter(connect()(Profile))