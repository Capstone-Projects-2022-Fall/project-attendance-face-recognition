import { showLoading, hideLoading} from 'react-redux-loading-bar'
import {getCurrentCourseAPI} from "../../utils/api/api";


export const SET_CURRENT_COURSE = "SET_CURRENT_COURSE"

export function setCurrentCourse(course){
    return {
        type: SET_CURRENT_COURSE,
        user:course,
    }
}

export function handleCurrentCourse(){
    return (dispatch)=>{
        dispatch(showLoading())
        return getCurrentCourseAPI()
            .then((course)=>{
                dispatch(setCurrentCourse(course))
            })
            .then(()=>dispatch(hideLoading()))
    }
}