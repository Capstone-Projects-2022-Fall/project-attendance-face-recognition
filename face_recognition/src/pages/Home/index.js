import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "../../component/Navbar"
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import AttendanceLinkContainer from "./containers/AttendanceLinkContainer";

class HomePage extends Component{
    render() {
        return(
            <Fragment>
                <Navbar/>
                <div className="App">
                    <header className="App-header">
                        <h1>Attendance Face Recognition</h1>
                        <AttendanceLinkContainer/>
                    </header>
                </div>
            </Fragment>
        )
    }
}

export default HomePage