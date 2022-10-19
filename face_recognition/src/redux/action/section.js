export const SET_CURRENT_SECTION = "SET_CURRENT_SECTION"

export function setCurrentSection(section){
    return{
        type: SET_CURRENT_SECTION,
        section
    }
}