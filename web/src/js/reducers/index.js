import {combineReducers} from "redux";
import profiles from "./profiles"
import skill from "./skill"

const rootReducer = combineReducers({
    profiles, skill
});


export default rootReducer