import axios from "axios"

const initialState = {
    profiles: [],
    details: {},
    fetchingProfiles: false,
    fetchingDetails: false
};

const PROFILES_FETCH = "PROFILES_FETCH";
const PROFILE_DETAILS_FETCH = "PROFILE_DETAILS_FETCH";

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
                    const oldDetails = state.details;
                    const newDetails = {...oldDetails};
                    newDetails[profile.id] = profile;
                    return {...state, details: newDetails, fetchingDetails: false};
                default:
                    return {...state, fetchingDetails: false}
            }
        default:
            return state
    }
}

/**
 * Fetch Profiles for overview
 */
const fetchProfilesReq = () => ({type: PROFILES_FETCH, status: 0});
const fetchProfilesRec = (profiles) => ({type: PROFILES_FETCH, status: 1, profiles});
const fetchProfilesErr = (error) => ({type: PROFILES_FETCH, status: -1, error});
export const fetchProfiles = () => (dispatch, getState) => {
    dispatch(fetchProfilesReq());
    axios.get('/profiles')
        .then(res => dispatch(fetchProfilesRec(res.data)))
        .catch(err => dispatch(fetchProfilesErr(err)))
};

const fetchProfileDetailsReq = id => ({type: PROFILE_DETAILS_FETCH, status: 0});
const fetchProfileDetailsRec = profile => ({type: PROFILE_DETAILS_FETCH, status: 1, profile});
const fetchProfileDetailsErr = error => ({type: PROFILE_DETAILS_FETCH, status: -1, error});
export const fetchProfileDetails = id => (dispatch, getState) => {
    dispatch(fetchProfileDetailsReq(id));
    axios.get(`/profiles/${id}`)
        .then(res => dispatch(fetchProfileDetailsRec(res.data)))
        .catch(err => dispatch(fetchProfileDetailsErr(err)))
};
