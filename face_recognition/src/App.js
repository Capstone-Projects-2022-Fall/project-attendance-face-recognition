import React, {Component, Suspense, lazy} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'
import {authenticateUserAPI} from "./utils/api/api";
import {connect} from "react-redux";
import {handleInitialData} from "./redux/action/shared";

const HomePage = lazy(()=>import("./pages/Home/index"));
const AttendancePage = lazy(()=>import("./pages/Attendance/index"));
const RegistrationPage = lazy(()=>import("./pages/Registration/index"));


class App extends Component {
    state = {
        "completed_registration":true,
    }
    componentDidMount() {
        let code = (new URLSearchParams(window.location.search)).get("code")
        const body = {
            "canvas_code": code
        }
        authenticateUserAPI(body)
            .then((token)=>{
                console.log(token)
                localStorage.setItem("token", token.access_token);
                console.log(localStorage.getItem("token"))
                this.props.dispatch(handleInitialData())
                    .then(data=>{
                        const {registered} = this.props
                        if (registered==false){
                            this.setState({
                                completed_registration:registered
                            })
                        }
                    })
            })
    }
    render() {
        return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" exact element={<HomePage/>}/>
                        <Route path="/record" exact element={<HomePage/>}/>
                        <Route path="/registration" exact element={<RegistrationPage/>}/>
                        <Route path="/attendance" exact element={<AttendancePage/>}/>
                    </Routes>
                </Suspense>
            </Router>
        )
    }
}

function mapStateToProps({authedUser, registered}){
    return {
        profile :authedUser,
        registered,
    }
}

export default connect(mapStateToProps)(App)
