import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TakingAttendance from "./containers/TakingAttendance";
import NavbarContainer from "../../container/NavbarContainer";

class AttendancePage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <NavbarContainer/>
                <Container fixed>
                    <TakingAttendance/>
                </Container>
            </Fragment>
        )
    }
}

export default AttendancePage