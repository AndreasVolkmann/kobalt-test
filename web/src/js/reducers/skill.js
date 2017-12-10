import axios from "axios"

const initialState = {
    id: null,
    name: '',
    topProfiles: []
};

const SKILL_FETCH = "SKILL_FETCH";

export default (state = initialState, action) => {
    switch (action.type) {
        case SKILL_FETCH:
            switch (action.status) {
                case 0:
                    return state;
                case 1:
                    return {...action.skill};
                default:
                    return state
            }
        default:
            return state
    }
}

const fetchSkillReq = id => ({type: SKILL_FETCH, status: 0, id});
const fetchSkillRec = skill => ({type: SKILL_FETCH, status: 1, skill});
const fetchSkillErr = error => ({type: SKILL_FETCH, status: -1, error});
export const fetchSkill = id => (dispatch, getState) => {
    dispatch(fetchSkillReq(id));
    axios.get(`/skills/${id}`)
        .then(res => dispatch(fetchSkillRec(res.data)))
        .catch(err => dispatch(fetchSkillErr(err)))
};
