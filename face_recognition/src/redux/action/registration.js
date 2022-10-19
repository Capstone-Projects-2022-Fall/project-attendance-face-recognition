export const CHECK_ACCOUNT_REGISTRATION = "CHECK_ACCOUNT_REGISTRATION"

export function checkAccountRegistration(registered){
    return{
        type: CHECK_ACCOUNT_REGISTRATION,
        registered
    }
}