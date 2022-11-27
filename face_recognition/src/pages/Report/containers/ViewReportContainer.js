import React, {Component, Fragment} from 'react';
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {Navigate} from 'react-router-dom';
import {attendanceReportAPI} from "../../../utils/api/api";
import DataTable from "react-data-table-component";
import {NavLink} from 'react-router-dom';

class ViewReportContainer extends Component{

    state = {
	columns : [
	    {
		name: "Course",
		selector: row => row.course,
	    },
	    {
		name: "Section",
		selector: row => row.section,
	    },
	    {
		name: "Date",
		selector: row => row.date,
		sortable: true
	    },
	    {
		name: "Attendance Status",
		selector: row => row.attendance
	    }
	],
	response_data: []
    }

    componentDidMount() {
	console.log("ViewReportContainer: Component mounted!")
	console.log("Going to pull student attendance!")
	attendanceReportAPI().then((r)=>{
	    console.log("Received the student's attendance!")
	    console.log("The response is:")
	    console.log(r)
	    this.setState({
		response_data: r
	    })
	})
    }

    render() {

	return(
	    <Fragment>
		<div className={"card"}>
		    <div className={"card-body"}>
			<DataTable
			    columns={this.state.columns}
			    data={this.state.response_data}
			    pagination
			    dense
			/>
		    </div>
		</div>
		<div className={"card"}>
		    <Button color={"inherit"} component={NavLink} to="/issueForm">
			Report Issue
			</Button>
		</div>
	    </Fragment>
	)
    }
}

export default connect()(ViewReportContainer)
