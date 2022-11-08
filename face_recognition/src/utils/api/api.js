const API_URL = "http://localhost:5000/api/v1";

const token = localStorage.getItem("token");
console.log(token)
export const getInitialInfoAPI = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
    }
    return fetch(`${API_URL}/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

/*
* request access token
 */
export const authenticateUserAPI = async (body)=>
    fetch(`${API_URL}/token/`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body)
    }).then(res => res.json())
        .then(data =>{return data})
        .catch(error=> console.log('error',error))


export const getCurrentCourseAPI = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
    }
    return fetch(`${API_URL}/courses/current/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

export const getTodayReport = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return fetch(`${API_URL}/report/today/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

export const getAttendanceSummary = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return fetch(`${API_URL}/statistics/attendance/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

export const getSectionNumSummary = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return fetch(`${API_URL}/statistics/sections/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}