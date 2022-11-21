import React, {Component, Fragment, useEffect} from 'react'
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle, Button} from "@mui/material";
import WebcamComponent from "../components/WecamComponent";
import {WebCamContainer} from "./WebCamContainer";
import {attendanceInstruction, attendanceSubmissionAPI} from "../../../utils/api/api";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";
    
class TakingAttendance extends Component{
    state = {
        imageProfile:"",
        image2Profile:"",
        imageEmotion:"",
        numPic : 0,
        authorization: 1,
        message:"",
        successMessage:"",
        errorMessage:"",
        emotion:"",
        first_name:"",
        last_name:"",
        email: "",
        completed:null,
        numAttempt:1,
	numSubmissions:0,
	maxAttempts:5
    }
    componentDidMount() {
        attendanceInstruction()
            .then(r => {
                if (r.authorization == 0){
                    console.log(r)
                    this.setState({
                        numPic:3,
                        authorization:r.authorization,
                        message: r.message,
                    })
                }
                else
                    this.setState({
                        authorization:r.authorization,
                        message: r.message,
                        emotion: r.emotion[0]
                    })
            })
    }
    nextStep = ()=>{
        this.setState({
            numPic: this.state.numPic+1
        })
    }
    handleChange = (imgSrc)=>{
        switch (this.state.numPic){
            case 0:
                this.setState({
                    imageProfile : imgSrc
                })
            case 1:
                this.setState({
                    image2Profile : imgSrc
                })
        }
    }
    handleSubmit = async (e) =>{
        e.preventDefault()
        const blob1Image = await fetch(this.state.imageProfile).then(res => res.blob());
        const blob2Image = await fetch(this.state.image2Profile).then(res => res.blob());

        let formData = new FormData()
        formData.append("regularImage", blob1Image,"regularStudent.jpeg")
        formData.append("emotionImage", blob2Image,"emotionStudent.jpeg")
        formData.append("emotion",this.state.emotion)

        attendanceSubmissionAPI(formData)
            .then((r)=>{
                console.log(r)
                if (r.completed==true){
                    this.setState({
                        completed:r.completed,
                        successMessage: r.message
                    })
                }
                else
                    this.setState({
                        completed:r.completed,
                        errorMessage: r.message
                    })
            })

	// Increment the number of submissions every time the student attempts to take attendance
	this.setState({
	    numSubmissions: this.state.numSubmissions+1
	})
    }

    handleRestart = ()=>{
        this.setState({
            imageProfile:"",
            image2Profile:"",
            imageEmotion:"",
            numPic : 0,
            authorization: 1,
            successMessage:"",
            errorMessage:"",
            first_name:"",
            last_name:"",
            email: "",
            completed:null,
            numAttempt: this.state.numAttempt+1,
	    maxAttempts: 5
        })
    }

    render() {
        const {current} = this.props
        if(!current){
            return (
                <Fragment>
                    <div className={"card"}>
                        <div className={"card-header"}>
                            Attendance
                        </div>
                    </div>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <Alert severity="error">
                                You are not scheduled for a class at this time
                            </Alert>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return(
            <Fragment>
                <div className={"card"}>
                    <div className={"card-header"}>
                        Attendance
                    </div>
                </div>
                <Grid container spacing={3}>
                    <Grid item sm xs md={8}>
                        <WebCamContainer
                            numPic={this.state.numPic}
                            nextStep={this.nextStep}
                            onChangeValue={this.handleChange}
                        />
                    </Grid>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            {
                                this.state.authorization ===1 && this.state.completed!=true?
                                    (
                                        <Alert severity="info">
                                            <AlertTitle>Instructions</AlertTitle>
                                            {this.state.message}. <br/><strong>Look directly into the camera</strong>
                                        </Alert>
                                    ):
                                    (
                                        <Alert severity="error">
                                            <AlertTitle>Message</AlertTitle>
                                            {this.state.message}
                                        </Alert>
                                    )
                            }
                        </div>
                        <div className={"card"}>
                            {
                                this.state.numPic ===1?
                                    (
                                        <Alert severity={"warning"}>
                                            Show that you are {this.state.emotion} while looking at the camera
                                        </Alert>
                                    ):
                                    (
                                        <Fragment></Fragment>
                                    )
                            }
                        </div>
                        <div className={"card"}>
                            {
                                this.state.completed === false && this.state.numAttempt < this.state.maxAttempts ?
                                    (
                                        <Fragment>
                                            <Alert
                                                severity={"error"}
                                                action={
                                                    <Button color={"inherit"} onClick={this.handleRestart}>
                                                        Start again
                                                    </Button>
                                                }
                                            >
                                                <AlertTitle>Not Found</AlertTitle>
                                                {this.state.errorMessage} You have used {this.state.numAttempt} attempt(s) out of {this.state.maxAttempts}.

                                            </Alert>
                                        </Fragment>
                                    ):<Fragment></Fragment>
                            }
                        </div>
                        <div className={"card"}>
                            {
                                this.state.completed === true?
                                    (
                                        <Fragment>
                                            <Alert
                                                severity={"success"}
                                                action={
                                                    <Button color={"inherit"} component={NavLink} to="/">
                                                        Back to AFR Home
                                                    </Button>
                                                }
                                            >
                                                <AlertTitle>Success</AlertTitle>
                                                {this.state.successMessage}

                                            </Alert>
                                        </Fragment>
                                    ):<Fragment></Fragment>
                            }
                        </div>
			<div className={"card"}>
			    {
				this.state.completed === false && this.state.numAttempt === this.state.maxAttempts ?
				    (
					<Fragment>
					    <Alert
						severity={"error"}
						action={
						    <Button color={"inherit"}>
						        Report Issue
						    </Button>
						}
					    >
					    <AlertTitle>Maximum Number of Attempts Reached!</AlertTitle>
					    </Alert>
					</Fragment>
				    ):<Fragment></Fragment>
			    }
			</div>		
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                            }}
                        >
                            {this.state.numPic==2?
                                <Button variant={"contained"} color={"info"} onClick={this.handleSubmit}>
                                    Submit attendance
                                </Button>:
                                <Fragment></Fragment>
                            }
                        </Box>

                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}
function mapStateToProps({section, course}){
    return{
        section,
        course,
        current:section.name===""?false:true
    }
}
export default connect(mapStateToProps)(TakingAttendance)
