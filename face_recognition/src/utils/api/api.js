const API_URL = "http://localhost:5000/api/v1";

const token = localStorage.getItem("token");
console.log(token)
export const getUserInfoAPI = async ()=>{
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
    }
    return fetch(`${API_URL}/user/`,{headers})
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