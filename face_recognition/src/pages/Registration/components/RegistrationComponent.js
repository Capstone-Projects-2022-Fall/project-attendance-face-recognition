import React, {Component, Fragment} from "react";
import {Button, Card, DialogActions, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";

class RegistrationComponent extends Component{

    submitRequest = ()=>{
        this.props.handleRequestSubmit()
    }
    render() {
        return(
            <Fragment>
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
                            <h3>Upload new pictures</h3>
                            <TextField
                                label="Image"
                                id="outlined-size-small"
                                type={"file"}
                                size="small"
                                onChange={(e)=>this.props.onChangeValue(e,"imageFile")}
                            />
                            <DialogActions>
                                <Button onClick={this.submitRequest} autoFocus>
                                    Upload
                                </Button>
                            </DialogActions>
                        </Box>
                </Card>
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
                    <Button variant="contained" color={"info"} component={NavLink} to="/">
                        Go Back Home
                    </Button>
                </Box>
            </Fragment>
        )
    }
}

export default RegistrationComponent