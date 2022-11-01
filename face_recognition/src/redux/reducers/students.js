import {GET_STUDENTS} from "../action/students"

export default function students(state={}, action){
    switch (action.type){
        case GET_STUDENTS:
            return{
                ...state,
                ...action.students
            }
        default:
            return state
    }
}