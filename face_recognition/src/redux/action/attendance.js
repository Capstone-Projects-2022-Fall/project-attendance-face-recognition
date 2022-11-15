import {hideLoading, showLoading} from "react-redux-loading-bar";
import {attendanceMonitoring} from "../../utils/api/api";

export const RETRIEVE_ATTENDANCE = "RETRIEVE_ATTENDANCE"
export const ADD_ATTENDANCE = "ADD_ATTENDANCE"

export function retrieveAttendance(attendances){
    return{
        type: RETRIEVE_ATTENDANCE,
        attendances
    }
}

export function addToAttendance(attendance){
    return{
        type: ADD_ATTENDANCE,
        attendance
    }
}

export function handleGetAttendance(){
    return(dispatch)=>{
        dispatch(showLoading())
        return attendanceMonitoring()
            .then(({attendance})=>{
                console.log(attendance)
                dispatch(retrieveAttendance((attendance)))
            })
            .then(()=>dispatch(hideLoading()))
    }
}

export function handleAddAttendance(attendance){
    return(dispatch)=>{
        dispatch(showLoading())
        dispatch(addToAttendance(attendance))
        dispatch(hideLoading())
    }
}