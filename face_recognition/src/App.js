import React, {Component, Suspense, lazy} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'
import {authenticateUserAPI} from "./utils/api/api";
import {connect} from "react-redux";
import {handleInitialData} from "./redux/action/shared";

const HomePage = lazy(()=>import("./pages/Home/index"));
const AttendancePage = lazy(()=>import("./pages/Attendance/index"));
const RegistrationPage = lazy(()=>import("./pages/Registration/index"));
const AdminPage = lazy(()=>import("./pages/Dashboard/index"));
const ConfigurationPage = lazy(()=>import("./pages/Configuration/index"));
const Page404 = lazy(()=>import("./pages/Error/404/index"))


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
                    localStorage.setItem("token", token.access_token);
                    this.props.dispatch(handleInitialData())
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
            console.log(localStorage.getItem("token"))
            this.props.dispatch(handleInitialData())
                .then(data=>{
                    const {registered, isInstructor} = this.props
                    this.setState({
                        is_instructor: isInstructor.instructor
                    })
                    if (registered===false){
                        this.setState({
                            completed_registration:registered,
                            completed_registration:registered.completed
                        })
                    }
                })
        }

    }
    render() {
        if (this.state.is_instructor){
            return (
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" exact element={<HomePage/>}/>
                            <Route path="/record" exact element={<HomePage/>}/>
                            <Route path="/admin/dashboard" exact element={<AdminPage/>}/>
                            <Route path="/admin/setup" exact element={<ConfigurationPage/>}/>
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
                        <Route path="/record" exact element={<HomePage/>}/>
                        <Route path="/registration" exact element={<RegistrationPage/>}/>
                        <Route path="/attendance" exact element={<AttendancePage/>}/>
                        <Route path="/admin/dashboard" exact element={<AdminPage/>}/>
                        <Route path="/admin/setup" exact element={<ConfigurationPage/>}/>
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
