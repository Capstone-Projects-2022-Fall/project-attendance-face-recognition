import React, {Component, Suspense, lazy} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'
import {authenticateUserAPI, createAttendanceAssignmentsAPI} from "./utils/api/api";
import {connect} from "react-redux";
import {handleInitialData} from "./redux/action/shared";
import {handleGetAttendance} from "./redux/action/attendance";

const HomePage = lazy(()=>import("./pages/Home/index"));
const AttendancePage = lazy(()=>import("./pages/Attendance/index"));
const AttendanceMonitoringPage = lazy(()=>import("./pages/Monitoring/index"));
const RegistrationPage = lazy(()=>import("./pages/Registration/index"));
const AdminPage = lazy(()=>import("./pages/Dashboard/index"));
const ConfigurationPage = lazy(()=>import("./pages/Configuration/index"));
const Page404 = lazy(()=>import("./pages/Error/404/index"))
const RecordPage = lazy(()=>import("./pages/Record/index"))
const IssueFormPage = lazy(()=>import("./pages/Issue/index"))

class App extends Component {
    state = {
        "completed_registration":true,
        "is_instructor":false
    }

    componentDidMount() {
        let code = (new URLSearchParams(window.location.search)).get("code")
        const body = {
            "canvas_code": code
        }

        if (!localStorage.getItem("token")){
            authenticateUserAPI(body)
                .then((token)=>{
                    localStorage.setItem("token", token.access_token)
                    this.props.dispatch(handleInitialData(token.access_token))
                        .then(()=>{
                            const {registered, isInstructor} = this.props
                            this.setState({
                                is_instructor: isInstructor.instructor,
                                completed_registration:registered.completed
                            })
                        })
                })
        }
        else{
            const token = localStorage.getItem("token")
            this.props.dispatch(handleInitialData(token))
                .then(data=>{
                    const {registered, isInstructor} = this.props
                    this.setState({
                        is_instructor: isInstructor.instructor
                    })
                    if (registered===false){
                        this.setState({
                            completed_registration:registered.completed
                        })
                    }
                })
        }

        // Create attendance assignments for any courses the user is teaching,
        // if the user is teaching any. This won't do anything if the teacher
        // is not teaching any classes.
        //createAttendanceAssignmentsAPI(body)

    }
    render() {
        if (this.state.is_instructor){
            return (
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" exact element={<AdminPage/>}/>
                            <Route path="/record" exact element={<RecordPage/>}/>
                            <Route path="/setup" exact element={<ConfigurationPage/>}/>
                            <Route path="/monitoring" exact element={<AttendanceMonitoringPage/>}/>
                            <Route path='*' exact element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </Router>
            )
        }
        return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" exact element={<HomePage/>}/>
                        <Route path="/record" exact element={<RecordPage/>}/>
                        <Route path="/setup" exact element={<RegistrationPage/>}/>
                        <Route path="/attendance" exact element={<AttendancePage/>}/>
			            <Route path="/issue" exact element={<IssueFormPage/>}/>
                        <Route path='*' exact element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </Router>
        )
    }
}

function mapStateToProps({authedUser, registered, isInstructor}){
    return {
        profile :authedUser,
        registered,
        isInstructor,
    }
}

export default connect(mapStateToProps)(App)
