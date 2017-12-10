import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card} from "antd"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SkillActions from "../reducers/skill";

class Skill extends Component {

    static propTypes = {
        skill: PropTypes.object.isRequired,
        fetchSkill: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {match, fetchSkill} = this.props;
        const urlId = match.params.id;
        fetchSkill(urlId)
    }

    render() {
        const {name, topProfiles} = this.props.skill;

        return <Card title={name}>

        </Card>
    }
}


const mapStateToProps = state => ({
    skill: state.skill
});

const mapDispatchToProps = dispatch => ({
    fetchSkill: bindActionCreators(SkillActions, dispatch).fetchSkill
});

export default connect(mapStateToProps, mapDispatchToProps)(Skill)