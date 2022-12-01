import React, {Component, Fragment} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddScheduleContainer from "./containers/AddScheduleContainer";
import ActiveCoursesContainer from "./containers/ActiveCoursesContainer";
import NavbarContainer from "../../container/NavbarContainer";

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
                        <NavbarContainer/>
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