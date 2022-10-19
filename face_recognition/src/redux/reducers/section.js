import {SET_CURRENT_SECTION} from "../action/section";


export default function section(state={}, action){
    switch(action.type) {
        case SET_CURRENT_SECTION:
            return {
                ...state,
                ...action.section
            }
        default:
            return state
    }
}