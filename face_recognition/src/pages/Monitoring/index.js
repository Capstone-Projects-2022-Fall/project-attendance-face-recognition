import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from "../../component/Navbar";
import ViewAttendanceContainer from "./containers/ViewAttendanceContainer";

class MonitoringPage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <ViewAttendanceContainer/>
                </Container>
            </Fragment>
        )
    }
}

export default MonitoringPage