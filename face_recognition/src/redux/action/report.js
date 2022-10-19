export const GET_REPORT = "GET_REPORT"

export function getReport(report){
    return{
        type: GET_REPORT,
        report
    }
}