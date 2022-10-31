import React, {Component, Fragment} from 'react'
import Navbar from "../../component/Navbar";
import AttendanceLinkContainer from "../Home/containers/AttendanceLinkContainer";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TakeAttendance from "../Attendance/containers/TakeAttendance";
import Grid from "@mui/material/Grid";
import CardSummaryContainer from "./containers/CardSummaryContainer";
import ChartCurrentContainer from "./containers/ChartCurrentContainer";
import RecentUserContainer from "./containers/RecentUserContainer";
import AttendanceIssueContainer from "./containers/AttendanceIssueContainer";
import TabContentView from "./components/TabContentView";

class AdminPage extends Component{
    render() {
        return(
            <div className="">
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item sm xs md={8}>
                            <CardSummaryContainer/>
                            <AttendanceIssueContainer/>
                            <TabContentView/>
                        </Grid>
                        <Grid item sm xs md={4}>
                            <ChartCurrentContainer/>
                            <RecentUserContainer/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default AdminPage