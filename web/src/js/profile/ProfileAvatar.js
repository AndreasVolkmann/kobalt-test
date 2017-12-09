import React from "react"
import {Avatar} from "antd"
import {defaultImgUrl} from "../util/utilities";

export const ProfileAvatar = ({profile}) => <Avatar src={profile.imgUrl || defaultImgUrl}/>;