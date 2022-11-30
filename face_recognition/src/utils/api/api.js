const API_URL = process.env.REACT_APP_API_URL;
// This is helpful for clearing the token when switching from student and user views
// Leave commented if you don't want to switch
//localStorage.removeItem("token");
const token = localStorage.getItem("token");
console.log("received token is")
console.log(token)
export const getInitialInfoAPI = async (initial_token)=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${initial_token}`,
    }
    return await fetch(`${API_URL}/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

/*
* request access token
 */
export const authenticateUserAPI = async (body)=>
    await fetch(`${API_URL}/token/`,{
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
* submit an issue
*/
export const issueSubmissionAPI = async(body)=>
    fetch(`${API_URL}/issue_submission/`,{
	method:'POST',
	headers:{
	    'Authorization': `Token ${localStorage.getItem("token")}`,
	},
	body:(body)
    }).then(res => res.json())
	.then(data =>{return data})
	.catch(error=> console.log("error", error))


/*
* approve issues
*/
export const issueApprovalAPI = async(body)=>
    fetch(`${API_URL}/issue_approval/`,{
	method:'POST',
	headers:{
	    'Authorization': `Token ${localStorage.getItem("token")}`,
	},
	body:(body)
    }).then(res => res.json())
	.then(data =>{return data})
	.catch(error=> console.log("error", error))


/*
* reject issues
*/
export const issueRejectionAPI = async(body)=>
    fetch(`${API_URL}/issue_rejection/`,{
	method:'POST',
	headers:{
	    'Authorization': `Token ${localStorage.getItem("token")}`,
	},
	body:(body)
    }).then(res => res.json())
	.then(data =>{return data})
	.catch(error=> console.log("error", error))


/*
* create schedule for section
*/
export const scheduleAdditionAPI = async(body)=>
    fetch(`${API_URL}/section/schedule/`,{
	method:'POST',
	headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
	    'Authorization': `Token ${localStorage.getItem("token")}`
	},
        body:JSON.stringify(body)
    }).then(res => res.json())
	.then(data =>{return data})
	.catch(error => console.log("error", error))


/*
* sync with canvas
*/
export const canvasSyncAPI = async(body)=>
    fetch(`${API_URL}/canvas_sync/`,{
	method:'POST',
	headers:{
	    'Authorization': `Token ${localStorage.getItem("token")}`
	},
	body:(body)
    }).then(res => res.json())
	.then(data =>{return data})
	.catch(error=> console.log("error", error))

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

/*
 * retrieve a list of active canvas courses
 */
export const canvasActiveCoursesAPI = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return await fetch(`${API_URL}/canvas/courses/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

/*
 * retrieve a list of active canvas section from a course
 */
export const canvasActiveSectionAPI = async (id)=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return await fetch(`${API_URL}/canvas/${id}/sections/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

/*
 * adding a new section to AFR
 */
export const canvasActiveCreateSectionAPI = async(body, id)=>
    await fetch(`${API_URL}/canvas/${id}/sections/`,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': `Token ${localStorage.getItem("token")}`
        },
        body:JSON.stringify(body)
    }).then(res => res.json())
        .then(data =>{return data})
        .catch(error=> console.log("error", error))


/*
 * delete schedule
 */
export const removeSchedule = async (id) =>
    await fetch(`${API_URL}/schedule/${id}/`,{
        method:'DELETE',
        headers:{
            'Authorization': `Token ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
        },
    }).catch(error=> console.log('error',error))

/*
 * get section info
 */
export const retrieveSectionInfoAPI = async (id)=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return await fetch(`${API_URL}/sections/${id}/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}

export const retrieveSectionCourseInfoAPI = async (id)=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
    }
    return await fetch(`${API_URL}/section/${id}/`,{headers})
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error", error))
}