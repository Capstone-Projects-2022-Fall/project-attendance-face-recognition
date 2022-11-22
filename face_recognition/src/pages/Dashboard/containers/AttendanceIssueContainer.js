import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import AttendanceIssueView from "../components/AttendanceIssueView";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import {Button} from "@mui/material";

class AttendanceIssueContainer extends Component{
    state = {
        columns : [
	    {
		name:"ID",
		selector: row => row.id,
		sortable: true
	    },
            {
                name:"Name",
                selector: row => row.name,
                sortable: true
            },
            {
                name: "Status",
                selector: row => row.status,
                sortable: true
            },
            {
                name: "Subject",
                selector: row => row.subject
            },
	    {
		name: "Message",
		selector: row => row.message
	    }
        ],
    }
    render() {
        const {issues} = this.props
	return(
	    <Fragment>
		<div className={"card"}>
		    <div className={"card-header"}>
			Select Issues to Handle
		    </div>
		    <div className={"card-body"}>
			<FormControl fullWidth sx={{ m: 1 }}>
			    <InputLabel htmlFor="Selected Issues">Selected Issues:</InputLabel>
			    <OutlinedInput
				id="issues_to_modify"
				label="Issues to modify:"
				type={"text"}
			    />
			</FormControl>
		    </div>
		</div>
		<div className={"card"}>
		    <Button color={"inherit"}>
			Approve Selected Issues
		    </Button>
		    <Button color={"inherit"}>
			Reject Selected Issues
		    </Button>
		</div>
		<div className={"card"}>
		    <div className={"card-body App"}>
			Reported Issues
		    </div>
		    <div className={"card-body"}>
			<AttendanceIssueView
			    columns={this.state.columns}
			    data={Object.values(issues)}
			    pagination
			/>
		    </div>
		</div>
	    </Fragment>
	)
    }
}

function mapStateToProps({issues}){
    return{
        issues
    }
}

export default connect(mapStateToProps)(AttendanceIssueContainer)
