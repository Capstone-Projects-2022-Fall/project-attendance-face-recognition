import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Card, ImageList, ImageListItem} from "@mui/material";
import Box from "@mui/material/Box";
import RegistrationComponent from "../components/RegistrationComponent";

class RegistrationContainer extends Component{
    state = {
        imageFile:null,
        recordedImages : []
    }
    componentDidMount() {
        this.viewRegisteredImagesAPI()
            .then((data)=>{
                console.log(data)
                this.setState({
                    recordedImages:data
                })
            })
    }

    handleChange = (e, field) =>{
        this.setState({
            [field]: e.target.files?e.target.files[0]:e.target.value
        })
    }
    handleSubmit = ()=>{
        const imageFile = this.state.imageFile
        let formData = new FormData()
        formData.append('imageFile', imageFile, imageFile.name)
        this.registerUserImageAPI(formData)
            .then((data)=>{
                console.log(data)
                this.viewRegisteredImagesAPI()
                    .then((data)=>{
                        this.setState({
                            recordedImages:data
                        })
                    })
            })
    }
    registerUserImageAPI = async (propsValue)=>
        fetch(`${process.env.REACT_APP_API_URL}/registration/`,{
            method:'POST',
            headers:{
                'Authorization': `Token ${localStorage.getItem("token")}`,
            },
            body:(propsValue)
        }).then(res => res.json())
            .then(data =>{return data})
            .catch(error=> console.log('error',error))

    viewRegisteredImagesAPI = async ()=>{
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }
        return fetch("http://localhost:5000/api/v1/registration/",{headers})
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.log("error", error))
    }
    render() {
        const {registered} = this.props
        const requestValues = {
            imageFile: this.state.imageFile
        }
        return(
            <Fragment>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item sm xs md={8}>
                            <RegistrationComponent
                                propsRequestValues={requestValues}
                                onChangeValue={this.handleChange}
                                handleRequestSubmit={this.handleSubmit}
                            />
                        </Grid>
                        <Grid item sm xs md={4}>
                            <Card>
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

                                        <ImageList sx={{ width: 300, height: 500 }} cols={2} rowHeight={164}>
                                            {
                                                this.state.recordedImages.map((img) =>
                                                    <ImageListItem key={img.id}>
                                                        <img
                                                            src={`${img.imageFile}&w=164&h=164&fit=crop&auto=format`}
                                                            srcSet={`${img.imageFile}&w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={"encoded image"}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                )
                                            }
                                        </ImageList>

                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}
function mapStateToProps({registed}){
    return{
        registed,
    }
}
export default connect(mapStateToProps)(RegistrationContainer)
