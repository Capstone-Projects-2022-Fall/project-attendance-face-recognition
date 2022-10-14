import React, {Component, Fragment} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "../../component/Navbar"
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';

class RecordPage extends Component{
    render() {
        return(
            <Fragment>
                <Navbar/>
                <div className="App">
                    <header className="App-header">
                        <h1>Attendance Face Recognition</h1>
                        <p>
                            Click on the button below to record your attendance
                        </p>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color={"info"}>
                                Record Attendance
                            </Button>
                            <Button variant="outlined" color={"info"}>
                                View Report
                            </Button>
                        </Stack>
                    </header>
                </div>
            </Fragment>
        )
    }
}

export default RecordPage