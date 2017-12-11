import React from "react"
import {Avatar} from "antd"
import {defaultImgUrl} from "../util/utilities";

export const ProfileAvatar = ({profile, imgUrl}) => <Avatar src={(profile ? profile.imgUrl : imgUrl) || defaultImgUrl}/>;