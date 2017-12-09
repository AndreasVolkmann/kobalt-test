import React from "react"
import {Card, List, Avatar} from "antd"
import DemoProfiles from "../data/DemoProfiles";
import {NavLink} from "react-router-dom";
import {defaultImgUrl} from "../util/utilities";
import {ProfileAvatar} from "../profile/ProfileAvatar";

export default class UserList extends React.Component {

    render() {
        const profiles = DemoProfiles;
        return <Card title="Users">
            <List itemLayout="horizontal" dataSource={profiles} renderItem={profile => (
                <List.Item>
                    <NavLink to={`/profiles/${profile.id}`}>
                        <List.Item.Meta avatar={<ProfileAvatar profile={profile} />} title={profile.name}/>
                    </NavLink>
                </List.Item>
            )}
            />

        </Card>
    }

}