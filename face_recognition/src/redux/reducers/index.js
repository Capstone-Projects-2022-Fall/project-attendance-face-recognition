import {combineReducers} from 'redux'
import authedUser from "./authedUser";
import course from "./course"
import section from "./section"
import registered from "./registration";
import report from "./report"
import isInstructor from "./role";
import issues from "./issues";
import students from "./students"
import schedule from "./schedule";
import attendance from "./attendance";

export default combineReducers({
    authedUser,
    attendance,
    course,
    section,
    registered,
    report,
    isInstructor,
    issues,
    students,
    schedule,
})