import React, {Component, Fragment} from 'react'
import Grid from "@mui/material/Grid";
import {Button, Card, CardActions, CardContent, CardMedia, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {canvasActiveCoursesAPI} from "../../../utils/api/api";
import ActiveSectionContainer from "./ActiveSectionContainer";
import {Navigate} from "react-router-dom"
import ActiveCoursesComponent from "../components/ActiveCoursesComponent";
import Box from "@mui/material/Box";
import AddScheduleContainer from "./AddScheduleContainer";

class ActiveCoursesContainer extends Component{
    state = {
        courses: null,
        steps:1,
        selectedCourse:0,
        selectedSection:null
    }
    componentDidMount() {
        canvasActiveCoursesAPI()
            .then(data=>{
                console.log(data)
                this.setState({
                    courses: data
                })
            })
    }
    nextStep = ()=>{
        this.setState({
            steps: this.state.steps+1
        })
    }
    prevStep = ()=>{
        if (this.state.steps >1){
            this.setState({
                steps: this.state.steps-1
            })
        }
    }
    retrieveCourse = (course)=>{
        this.setState({
            selectedCourse:course
        })
        this.nextStep()
    }
    retrieveSection = (section)=>{
        this.setState({
            selectedSection:section
        })
        this.nextStep()
    }

    render() {
        if (this.state.courses==null){
            return (
                <Box sx={{ width: 300 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                </Box>
            )
        }
        switch (this.state.steps) {
            case 1:
                return (
                    <Grid container spacing={3}>
                        {
                            this.state.courses.map((data) => (
                                <ActiveCoursesComponent
                                    key={data.id}
                                    data={data}
                                    courseSelected={this.retrieveCourse}
                                />
                            ))
                        }
                    </Grid>
                )
            case 2:
                return (
                    <ActiveSectionContainer
                        id={this.state.selectedCourse}
                        sectionSelected = {this.retrieveSection}
                        nextStep ={this.nextStep}
                        prevStep ={this.prevStep}
                    />
                )
            case 3:
                return(
                    <AddScheduleContainer
                        section = {this.state.selectedSection}
                        nextStep ={this.nextStep}
                        prevStep ={this.prevStep}
                    />
                )
        }
    }
}
export default ActiveCoursesContainer