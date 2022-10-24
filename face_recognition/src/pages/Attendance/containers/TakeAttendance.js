import React, {Component, Fragment, useRef} from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import WebcamComponent from "../components/WecamComponent";
import {Button} from "@mui/material";
import html2canvas from 'html2canvas';
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


class TakeAttendance extends Component{
    state = {
        imgProfile: "",
    }
    handleChange = (imgSrc)=>{
        this.setState({
            imgProfile:imgSrc,
            first_name:"",
            last_name:"",
            email: "",
            submitted: false,
        })
    }
    handleSubmit = async (e) => {
        //console.log(this.state.imgProfile)
        e.preventDefault()
        const blob = await fetch(this.state.imgProfile).then(res => res.blob());
        let formData = new FormData()
        formData.append("image", blob,"student.jpeg")
        this.recognizeUserAPI(formData)
            .then((data)=>{
                this.setState({
                    submitted:true,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    email: data.user.email
                })
            })
    }
    recognizeUserAPI = async (propsValue)=>
        fetch(`http://localhost:5000/api/v1/recognition/`,{
            method:'POST',
            headers:{
                'Authorization': `Token ${localStorage.getItem("token")}`,
            },
            body:(propsValue)
        }).then(res => res.json())
            .then(data =>{return data})
            .catch(error=> console.log('error',error))


    render() {
        const {registered} = this.props
        return(
            <Fragment>
                {this.state.imgProfile.length ===0?(
                    <WebcamComponent
                        onChangeValue={this.handleChange}
                    />
                ):(
                    <Fragment>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <img
                                src={this.state.imgProfile}
                                width={300}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                            }}
                        >
                            {this.state.submitted === false?
                                (
                                    <Button variant="contained" color={"success"} onClick={this.handleSubmit}>
                                        Submit Snapshot
                                    </Button>
                                ):
                                (
                                    <Fragment>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection:'column',
                                                p: 2,
                                                m: 2,
                                                bgcolor: 'background.paper',
                                            }}
                                        >
                                            <Typography variant="h3" component="h3">
                                                Hello {this.state.first_name}!👋
                                            </Typography>
                                            <Box sx={{ typography: 'subtitle2', textAlign:'center', m:2 }}>
                                                You have been marked present
                                            </Box>
                                            <Button variant="contained" color={"info"} component={NavLink} to="/">
                                                Go Home
                                            </Button>
                                        </Box>
                                    </Fragment>
                                )
                            }

                        </Box>
                    </Fragment>
                )}
                {registered.completed === false?
                    (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection:'column',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Box sx={{ typography: 'subtitle2', textAlign:'center', m:2 }}>
                                A minimum of five pictures are required. Please upload more pictures
                            </Box>
                            <Box sx={{ typography: 'subtitle2', textAlign:'center', m:2 }}>
                                <Button variant="contained" color={"warning"} component={NavLink} to="/registration">
                                    Upload more pictures
                                </Button>
                            </Box>
                            <Box sx={{ typography: 'subtitle2', textAlign:'center', m:2 }}>
                                <Button variant="contained" color={"primary"} component={NavLink} to="/registration">
                                    Help
                                </Button>
                            </Box>


                        </Box>


                    ):
                    (
                        <Fragment></Fragment>
                    )
                }

            </Fragment>
        )
    }
}
function mapStateToProps({registered}){
    console.log(registered)
    return{
        registered,
    }
}
export default connect(mapStateToProps)(TakeAttendance)