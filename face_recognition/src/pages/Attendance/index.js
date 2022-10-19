import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from "../../component/Navbar";
import TakeAttendance from "./containers/TakeAttendance";

class AttendancePage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <TakeAttendance/>
                </Container>
            </Fragment>
        )
    }
}

export default AttendancePage