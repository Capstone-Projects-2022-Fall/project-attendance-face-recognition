import {removeSchedule, scheduleAdditionAPI} from "../../utils/api/api";
import {hideLoading, showLoading} from "react-redux-loading-bar";

export const GET_SCHEDULE = "GET_SCHEDULE"
export const ADD_SECTION_SCHEDULE = "ADD_SECTION_SCHEDULE"
export const DELETE_SCHEDULE = "DELETE_SCHEDULE"

export function getSchedule(schedules){
    return{
        type: GET_SCHEDULE,
        schedules
    }
}

export function createSectionSchedule(schedule){
    return{
        type: ADD_SECTION_SCHEDULE,
        schedule
    }
}

export function deleteSchedule(id){
    return{
        type:DELETE_SCHEDULE,
        id,
    }
}

export function handleSectionSchedule(body){
    return (dispatch)=>{
        dispatch(showLoading())
        return scheduleAdditionAPI(body)
            .then(({schedule})=>{
                console.log(schedule)
                dispatch(createSectionSchedule(schedule))
            })
            .then(()=>dispatch(hideLoading()))
    }
}

export function handleDeleteSchedule(id){
    return(dispatch)=>{
        dispatch(showLoading())
        return removeSchedule(id)
            .then(()=>{
                dispatch(deleteSchedule(id))
            })
            .then(()=>dispatch(hideLoading()))
    }
}