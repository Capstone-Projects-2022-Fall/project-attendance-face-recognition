import {SET_AUTHED_USER} from '../action/authedUser'

export default function authedUser(state={}, action){
    switch(action.type) {
        case SET_AUTHED_USER:
            return {
                ...state,
                ...action.user
            }
        default:
            return state
    }
}