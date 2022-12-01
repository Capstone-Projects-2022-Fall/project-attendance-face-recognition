import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import AttendanceLinkContainer from "./containers/AttendanceLinkContainer";
import NavbarContainer from "../../container/NavbarContainer";

class HomePage extends Component{
    render() {
        return(
            <Fragment>
                <NavbarContainer/>
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