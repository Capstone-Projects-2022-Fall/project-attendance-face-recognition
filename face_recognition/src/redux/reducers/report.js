import {GET_REPORT} from "../action/report";

export default function report(state={}, action){
    switch(action.type) {
        case GET_REPORT:
            return {
                ...state,
                ...action.report
            }
        default:
            return state
    }
}