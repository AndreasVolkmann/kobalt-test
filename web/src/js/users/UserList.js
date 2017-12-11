import React from "react"
import {Card, List} from "antd"
import {NavLink} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as ProfileActions from "../reducers/profiles"
import {ProfileAvatar} from "../profile/ProfileAvatar";

class UserList extends React.Component {

    componentDidMount() {
        this.props.fetchProfiles()
    }

    render() {
        const {profiles, fetchingProfiles} = this.props;
        return <Card title="Users">
            <List itemLayout="horizontal" dataSource={profiles} loading={fetchingProfiles} renderItem={profile => (
                <List.Item>
                    <NavLink to={`/profiles/${profile.id}`}>
                        <List.Item.Meta avatar={<ProfileAvatar profile={profile}/>} title={profile.name}/>
                    </NavLink>
                </List.Item>
            )}
            />

        </Card>
    }

}

const mapStateToProps = state => ({
    profiles: state.profiles.profiles,
    fetchingProfiles: state.profiles.fetchingProfiles
});

const mapDispatchToProps = dispatch => ({
    fetchProfiles: bindActionCreators(ProfileActions, dispatch).fetchProfiles
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList)