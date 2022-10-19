

export const SET_CURRENT_COURSE = "SET_CURRENT_COURSE"

export function setCurrentCourse(course){
    return {
        type: SET_CURRENT_COURSE,
        course,
    }
}
