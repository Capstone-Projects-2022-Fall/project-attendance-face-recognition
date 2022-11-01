export const GET_STUDENTS = "GET_STUDENTS"

export function retrieveStudents(students){
    return{
        type: GET_STUDENTS,
        students
    }
}