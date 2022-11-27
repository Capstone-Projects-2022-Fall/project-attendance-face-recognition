import React, {Component, Fragment} from "react";
import {Button, Card, DialogActions, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";
import {Alert, AlertTitle} from "@mui/material";

class RegistrationComponent extends Component{

    state = {
        numImagesUploaded : 0
    }

    submitRequest = ()=>{
        this.props.handleRequestSubmit()
        this.setState({
	    numImagesUploaded : this.state.numImagesUploaded + 1
	})
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
			    <div className={"card"}>
				{
				    <Alert severity="warning">
					<AlertTitle>Instructions</AlertTitle>
					Please upload at least 5 images of yourself for proper recognition.
				    </Alert>
				}
			    </div>
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
                    <div className={"card"}>
			{
			    this.state.numImagesUploaded === 5 ?
				(
			    	    <Fragment>
					<Alert
				    	    severity={"success"}
				    	    action={
						<Button color={"inherit"}><a href="https://3.235.17.130">
					    	    Return to Canvas
						</a></Button>
				   	    }
					>
				    	    <AlertTitle>Registration Complete!</AlertTitle>
				    	    You are now ready to start taking attendance.
					</Alert>
			    	    </Fragment>
				):<Fragment></Fragment>
			}
		    </div>
                </Box>
            </Fragment>
        )
    }
}

export default RegistrationComponent
