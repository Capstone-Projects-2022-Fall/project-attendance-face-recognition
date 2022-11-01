export const GET_ISSUES = "GET_ISSUES"

export function retrieveIssues(issues){
    return{
        type: GET_ISSUES,
        issues: issues
    }
}