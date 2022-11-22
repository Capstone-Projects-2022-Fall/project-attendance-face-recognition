import React, {Component, Fragment} from 'react';
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

class AddScheduleContainer extends Component {

    render() {
	return(
	    <Fragment>
		<div className={"card"}>
		    <div className={"card-header"}>
			Add Schedule
		    </div>
		    <div className={"card-body"}>
			<FormControl fullWidth sx={{ m: 1}}>
			    <InputLabel htmlFor="Selected Section">Selected Section:</InputLabel>
			    <OutlinedInput
				id="section_to_update"
				label="Section to update:"
				type={"text"}
			    />
			</FormControl>
			<FormControl fullWidth sx={{ m: 1}}>
			    <InputLabel>Day of the Week</InputLabel>
			    <Select
				label={"weekday"}
			    >
				<MenuItem value={"0"}>Monday</MenuItem>
				<MenuItem value={"1"}>Tuesday</MenuItem>
				<MenuItem value={"2"}>Wednesday</MenuItem>
				<MenuItem value={"3"}>Thursday</MenuItem>
				<MenuItem value={"4"}>Friday</MenuItem>
				<MenuItem value={"5"}>Saturday</MenuItem>
				<MenuItem value={"6"}>Sunday</MenuItem>
			    </Select>
			</FormControl>
			Start Time
			<FormControl fullWidth sx={{ m: 1 }}>
			    <InputLabel></InputLabel>
			    <OutlinedInput
				id="start_time"
				type={"time"}
			    />
			</FormControl>
			End Time
			<FormControl fullWidth sx={{ m: 1 }}>
			    <InputLabel></InputLabel>
			    <OutlinedInput
				id="end_time"
				type={"time"}
			    />
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }}>
			    <Button color={"inherit"}>
				Add Schedule
			    </Button>
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }}>
			    <Button color={"inherit"}>
				Return To Dashboard
			    </Button>
			</FormControl>
		    </div>
		</div>
	    </Fragment>
	)
    }
}

export default connect()(AddScheduleContainer)
