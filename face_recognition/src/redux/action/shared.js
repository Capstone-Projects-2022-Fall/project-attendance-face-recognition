import {hideLoading, showLoading} from "react-redux-loading-bar";
import {getInitialInfoAPI} from "../../utils/api/api";
import {setAuthedUser} from "./authedUser";
import {setCurrentCourse} from "./course";
import {setCurrentSection} from "./section";
import {checkAccountRegistration} from "./registration";
import {getReport} from "./report";
import {isInstructor} from "./role";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialInfoAPI()
            .then(({user, current_course, current_section, report, registration_completed, role_teacher})=>{
                dispatch(setAuthedUser(user))
                dispatch(setCurrentCourse(current_course))
                dispatch(setCurrentSection(current_section))
                dispatch(checkAccountRegistration(registration_completed))
                dispatch(getReport(report))
                dispatch(isInstructor(role_teacher))
            })
            .then(()=>dispatch(hideLoading()))
    }
}