import React, {Component, Fragment} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../component/Navbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddScheduleContainer from "./containers/AddScheduleContainer";

class Configuration extends Component{
    render(){
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container fixed>
                    <AddScheduleContainer/>
                </Container>
            </Fragment>
        )
    }
}

export default Configuration
