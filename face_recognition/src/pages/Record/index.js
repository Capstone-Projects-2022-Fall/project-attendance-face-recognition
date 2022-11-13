import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "../../component/Navbar"
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import RecordListContainer from "./container/RecordListContainer";
import StatisticalReportContainer from "./container/StatisticalReportContainer";
import SectionNumChartContainer from "./container/SectionNumChartContainer";

class RecordPage extends Component{
    render() {
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item sm xs md={8}>
                            <StatisticalReportContainer/>
                        </Grid>
                        <Grid item sm xs md={3.8}>
                            <SectionNumChartContainer/>
                        </Grid>
                        <Grid item sm xs md={12}>
                            <RecordListContainer/>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

export default RecordPage