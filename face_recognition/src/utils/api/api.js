const API_URL = process.env.REACT_APP_API_URL;
// This is helpful for clearing the token when switching from student and user views
// Leave commented if you don't want to switch
//localStorage.removeItem("token");
const token = localStorage.getItem("token");
console.log("received token is")
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

export const createAttendanceAssignmentsAPI = async (body)=>{
    return fetch(`${API_URL}/assignments/`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body)
    }).then(res => res.json())
         .then(data=>{return data})
         .catch(error=> console.log('error',error))
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

export const attendanceInstruction = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return fetch(`${API_URL}/attendance/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

/*
* submit attendance
 */
export const attendanceSubmissionAPI = async (body)=>
    fetch(`${API_URL}/attendance/`,{
        method:'POST',
        headers:{
            'Authorization': `Token ${localStorage.getItem("token")}`,
        },
        body:(body)
    }).then(res => res.json())
        .then(data =>{return data})
        .catch(error=> console.log('error',error))

/*

 */
export const attendanceMonitoring = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return fetch(`${API_URL}/attendance/monitoring/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}
