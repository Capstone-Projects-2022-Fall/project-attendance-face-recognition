import {ADD_ATTENDANCE, RETRIEVE_ATTENDANCE} from "../action/attendance";
import _ from "lodash";

export default function attendance(state={}, action){
    switch (action.type){
        case RETRIEVE_ATTENDANCE:
            return{
                ...state,
                ...state, ..._.mapKeys(action.attendances, 'id')
            }
        case ADD_ATTENDANCE:
            return {
                ...state,
                [action.attendance.id]:action.attendance
            }
        default:
            return state
    }
}