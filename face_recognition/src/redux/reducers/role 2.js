import {IS_INSTRUCTOR} from "../action/role";

export default function isInstructor(state={}, action){
    switch(action.type) {
        case IS_INSTRUCTOR:
            return {
                ...state,
                ...action.instructor
            }
        default:
            return state
    }
}