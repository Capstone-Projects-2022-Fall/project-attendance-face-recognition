import {SET_CURRENT_COURSE} from '../action/course'

export default function authedUser(state={}, action){
    switch(action.type) {
        case SET_CURRENT_COURSE:
            return {
                ...state,
                ...action.course
            }
        default:
            return state
    }
}