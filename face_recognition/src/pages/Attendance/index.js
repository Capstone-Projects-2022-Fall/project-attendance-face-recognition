import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from "../../component/Navbar";
import TakingAttendance from "./containers/TakingAttendance";

class AttendancePage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <TakingAttendance/>
                </Container>
            </Fragment>
        )
    }
}

export default AttendancePage