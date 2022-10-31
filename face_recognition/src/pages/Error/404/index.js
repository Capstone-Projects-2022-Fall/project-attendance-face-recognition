import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Image from '../../../assets/images/AdobeStock_307390602.jpeg'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {NavLink} from 'react-router-dom';
import Navbar from "../../../component/Navbar";


const styleImg = {
    textAlign: "center",
    paddingTop: "100px",
}

class Page404 extends Component{
    render(){
        return(
            <Fragment>
                <CssBaseline />
                <Navbar/>
                <Container maxWidth="lg">
                    <div style={styleImg}>
                        <img src={Image} alt="404 background" height="350"></img>
                    </div>
                    <Box textAlign="center">
                        <Button variant="contained" disableElevation component={NavLink} to="/">
                            Go to home page
                        </Button>
                    </Box>
                </Container>
            </Fragment>
        )
    }
}

export default Page404