import { showLoading, hideLoading} from 'react-redux-loading-bar'
import {getUserInfoAPI} from "../../utils/api/api";

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(user){
    return {
        type: SET_AUTHED_USER,
        user:user,
    }
}





export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getUserInfoAPI()
            .then((user)=>{
                dispatch(setAuthedUser(user))
            })
            .then(()=>dispatch(hideLoading()))
    }
}