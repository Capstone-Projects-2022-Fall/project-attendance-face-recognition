export const IS_INSTRUCTOR = "IS_INSTRUCTOR"

export function isInstructor(role){
    return {
        type: IS_INSTRUCTOR,
        instructor: {"instructor":role}
    }
}