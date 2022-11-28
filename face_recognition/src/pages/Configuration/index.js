import React, {Component, Fragment} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../component/Navbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddScheduleContainer from "./containers/AddScheduleContainer";
import ActiveCoursesContainer from "./containers/ActiveCoursesContainer";

class Configuration extends Component{
    state = {
        navValue:1
    }
    changeNavValue = (value)=>{
        this.setState({
            navValue:value,
        })
    }
    render(){
        switch (this.state.navValue) {
            case 1:
                return (
                    <Fragment>
                        <CssBaseline/>
                        <Navbar/>
                        <Container fixed>
                            <ActiveCoursesContainer/>
                        </Container>
                    </Fragment>
                )
        }
    }
}

export default Configuration
/*
<AddScheduleContainer/>
 */