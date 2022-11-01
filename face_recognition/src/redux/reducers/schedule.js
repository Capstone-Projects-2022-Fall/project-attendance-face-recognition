import {GET_SCHEDULE} from "../action/schedule";

export default function schedule(state={}, action){
    switch (action.type){
        case GET_SCHEDULE:
            return{
                ...state,
                ...action.schedule
            }
        default:
            return state
    }
}