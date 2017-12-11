import React from "react"
import PropTypes from "prop-types"
import {Row, Col, Button, Input} from "antd"

const AddSkillModal = ({show, changeShow, skill, changeSkill, endorse}) => {

    const content = show
        ? [
            <Col key={1} span={6}><Input onChange={changeSkill} value={skill} placeholder="Input skill..."/></Col>,
            <Col key={2} span={6}><Button type="primary" onClick={endorse}>Submit</Button></Col>,
            <Col key={3} span={4}><a onClick={changeShow}>Cancel</a></Col>
        ]
        : <Button icon="plus" onClick={changeShow}>スキルを推薦する</Button>;

    return <Row gutter={10}>
        {content}
    </Row>
};

AddSkillModal.propTypes = {
    show: PropTypes.bool.isRequired,
    skill: PropTypes.string,
    changeShow: PropTypes.func.isRequired,
    changeSkill: PropTypes.func.isRequired,
    endorse: PropTypes.func.isRequired
};

export default AddSkillModal