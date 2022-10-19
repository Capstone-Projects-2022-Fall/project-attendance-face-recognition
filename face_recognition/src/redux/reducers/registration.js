import {CHECK_ACCOUNT_REGISTRATION} from "../action/registration";

export default function registered(state={}, action){
    switch(action.type) {
        case CHECK_ACCOUNT_REGISTRATION:
            return {
                ...state,
                ...action.registered
            }
        default:
            return state
    }
}