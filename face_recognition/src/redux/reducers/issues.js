import {GET_ISSUES} from '../action/issues'

export default function issues(state={}, action){
    switch (action.type){
        case GET_ISSUES:
            return{
                ...state,
                ...action.issues
            }
        default:
            return state
    }
}