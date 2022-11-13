import React, {Component, Fragment} from 'react'
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";


class AddClassContainer extends Component{
    render() {
        return(
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Course
                            </div>
                            <div className={"card-body"}>

                            </div>
                        </div>
                    </Grid>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Section
                            </div>
                            <div className={"card-body"}>

                            </div>
                        </div>
                    </Grid>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Schedule
                            </div>
                            <div className={"card-body"}>
=======
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel>Day of the Week</InputLabel>
                                    <Select
                                        label={"weekday"}
                                    >
                                        <MenuItem value={""}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"0"}>Monday</MenuItem>
                                        <MenuItem value={"1"}>Tuesday</MenuItem>
                                        <MenuItem value={"2"}>Wednesday</MenuItem>
                                        <MenuItem value={"3"}>Thursday</MenuItem>
                                        <MenuItem value={"4"}>Friday</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Start Time</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="Start Time"
                                        type={"time"}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">End Time</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="End Time"
                                        type={"time"}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 2 }}>
                                    <Button variant={"outlined"}>Add</Button>
                                </FormControl>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default connect()(AddClassContainer)