import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ViewAttendanceContainer from "./containers/ViewAttendanceContainer";
import NavbarContainer from "../../container/NavbarContainer";

class MonitoringPage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <NavbarContainer/>
                <Container fixed>
                    <ViewAttendanceContainer/>
                </Container>
            </Fragment>
        )
    }
}

export default MonitoringPage