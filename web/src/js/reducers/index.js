import {combineReducers} from "redux";
import profiles from "./profiles"
import skill from "./skill"
import auth from "./auth"

const rootReducer = combineReducers({
    profiles, skill, auth
});


export default rootReducer