import axios from "axios"
import {getConfig} from "../util/utilities";

const initialState = {
    profiles: [],
    details: {},
    fetchingProfiles: false,
    fetchingDetails: false
};

const PROFILES_FETCH = "PROFILES_FETCH";
const PROFILE_DETAILS_FETCH = "PROFILE_DETAILS_FETCH";
const ENDORSE = "ENDORSE";

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILES_FETCH:
            switch (action.status) {
                case 0:
                    return {...state, fetchingProfiles: true};
                case 1:
                    return {...state, profiles: action.profiles, fetchingProfiles: false};
                default:
                    return {...state, fetchingProfiles: false}
            }
        case PROFILE_DETAILS_FETCH:
            switch (action.status) {
                case 0:
                    return {...state, fetchingDetails: true};
                case 1:
                    const profile = action.profile;
                    return updateDetails(profile, state);
                default:
                    return {...state, fetchingDetails: false}
            }
        case ENDORSE:
            switch (action.status) {
                case 0:
                    return state;
                case 1:
                    return updateDetails(action.profile, state);
                default:
                    return state
            }
        default:
            return state
    }
}

const updateDetails = (profile, state) => {
    const newDetails = {...state.details};
    newDetails[profile.id] = profile;
    return {...state, details: newDetails, fetchingDetails: false};
};

/**
 * Fetch Profiles for overview
 */
const fetchProfilesReq = () => ({type: PROFILES_FETCH, status: 0});
const fetchProfilesRec = (profiles) => ({type: PROFILES_FETCH, status: 1, profiles});
const fetchProfilesErr = (error) => ({type: PROFILES_FETCH, status: -1, error});
export const fetchProfiles = () => (dispatch, getState) => {
    dispatch(fetchProfilesReq());
    axios.get('/api/profiles', getConfig(getState))
        .then(res => dispatch(fetchProfilesRec(res.data)))
        .catch(err => dispatch(fetchProfilesErr(err)))
};

/**
 * Fetch details for a Profile by ID
 * @param id
 */
const fetchProfileDetailsReq = id => ({type: PROFILE_DETAILS_FETCH, status: 0});
const fetchProfileDetailsRec = profile => ({type: PROFILE_DETAILS_FETCH, status: 1, profile});
const fetchProfileDetailsErr = error => ({type: PROFILE_DETAILS_FETCH, status: -1, error});
export const fetchProfileDetails = id => (dispatch, getState) => {
    dispatch(fetchProfileDetailsReq(id));
    axios.get(`/api/profiles/${id}`, getConfig(getState))
        .then(res => dispatch(fetchProfileDetailsRec(res.data)))
        .catch(err => dispatch(fetchProfileDetailsErr(err)))
};

const endorseReq = (skill, targetId, sourceId) => ({type: ENDORSE, status: 0});
const endorseRec = profile => ({type: ENDORSE, status: 1, profile});
const endorseErr = error => ({type: ENDORSE, status: -1, error});
export const endorse = (skill, targetId) => (dispatch, getState) => {
    const {id} = getState().auth;
    dispatch(endorseReq(skill, targetId, id));
    const endorsement = {skill, targetProfileId: targetId, endorserId: id};
    console.log(endorsement);
    axios.post('/api/profiles/endorse', endorsement, getConfig(getState))
        .then(res => dispatch(endorseRec(res.data)))
        .catch(err => dispatch(endorseErr(err)));
};