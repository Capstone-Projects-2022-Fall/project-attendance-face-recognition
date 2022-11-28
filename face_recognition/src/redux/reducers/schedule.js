import {GET_SCHEDULE, ADD_SECTION_SCHEDULE, DELETE_SCHEDULE} from "../action/schedule";

export default function schedule(state={}, action){
    switch (action.type){
        case GET_SCHEDULE:
            return{
                ...state,
                ...action.schedules
            }
        case ADD_SECTION_SCHEDULE:
            return{
                ...state,
                [action.schedule.id]:action.schedule
            }
        case DELETE_SCHEDULE:
            const {[action.id]:omit, ...newState} = state
            return newState
        default:
            return state
    }
}