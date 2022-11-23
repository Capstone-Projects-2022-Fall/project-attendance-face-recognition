import React, {Component, Fragment} from 'react';
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {scheduleAdditionAPI} from "../../../utils/api/api";
import {NavLink} from 'react-router-dom';

class AddScheduleContainer extends Component {

    state = {
	dateSelected:""
    }

    addSectionSchedule = async (e) => {
	e.preventDefault()
	console.log("Going to add a schedule!")
	let formData = new FormData()
	formData.append("section", document.getElementById("section_to_update").value)
	formData.append("weekday", this.state.dateSelected)
	formData.append("start_time", document.getElementById("start_time").value)
	formData.append("end_time", document.getElementById("end_time").value)
	console.log(formData)
	scheduleAdditionAPI(formData)
	    .then((r)=>{
		console.log("schedule has been added!")
	    })
    }

    handleChange = (event) => {
        this.setState({
	    dateSelected: event.target.value
	})
	console.log("Dropdown menu selection changed! It is now:")
	console.log(event.target.value)
    }

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
				onChange={this.handleChange}
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
			    <Button color={"inherit"} onClick={this.addSectionSchedule}>
				Add Schedule
			    </Button>
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }}>
			    <Button color={"inherit"} component={NavLink} to="/">
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