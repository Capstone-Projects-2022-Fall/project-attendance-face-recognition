import React, {Component, Suspense, lazy} from "react";
import './App.css';
import {Fragment} from "react";
import Navbar from "./component/Navbar"
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'
import {authenticateUserAPI} from "./utils/api/api";
import {connect} from "react-redux";
import {handleInitialData} from "./redux/action/authedUser";
import {handleCurrentCourse} from "./redux/action/course";

const HomePage = lazy(()=>import("./pages/Home/index"));


class App extends Component {
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
                this.props.dispatch(handleCurrentCourse())
            })
    }
    render() {
        return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" exact element={<HomePage/>}/>
                        <Route path="/record" exact element={<HomePage/>}/>
                    </Routes>
                </Suspense>
            </Router>
        )
    }
}

export default connect()(App)

/*
return (
      <Fragment>
        <Navbar/>
        <div className="App">
          <header className="App-header">
            <h1>Attendance Face Recognition</h1>
            <p>
              Click on the button below to record your attendance
            </p>
              <Button variant="contained">
                  Record Attendance
              </Button>
          </header>
        </div>
      </Fragment>
  );
 */