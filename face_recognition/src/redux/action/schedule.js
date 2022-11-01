export const GET_SCHEDULE = "GET_SCHEDULE"

export function getSchedule(schedule){
    return{
        type: GET_SCHEDULE,
        schedule
    }
}