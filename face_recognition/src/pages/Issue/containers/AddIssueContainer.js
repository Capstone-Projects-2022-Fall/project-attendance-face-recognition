import React, {Component, Fragment} from 'react';
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {issueSubmissionAPI} from "../../../utils/api/api";
import {Navigate} from "react-router-dom";

class AddIssueContainer extends Component {

    state = {
	issueSubmitted: false
    }

    handleIssue = async (e) => {
	e.preventDefault()
	console.log("Will call the API to submit the issue here!")
	console.log("The subject pulled from the form is:")
	console.log(document.getElementById("issue_subject").value)
	console.log("The description pulled from the form is:")
	console.log(document.getElementById("issue_message").value)
	// Send data to the backend through this form
	// All we need to send is the issue's subject and message. The rest of
	// the fields will be pulled from the requestor.
	let formData = new FormData()
	formData.append("subject", document.getElementById("issue_subject").value)
	formData.append("message", document.getElementById("issue_message").value)
	issueSubmissionAPI(formData)
	    .then((r)=>{
		if (r.completed == true) {
		    this.setState({
			issueSubmitted: true
		    })
		}
	    })
    }

    render() {

	// Return to the home page once an issue has been submitted.
	if (this.state.issueSubmitted) {
	    return <Navigate to='/'/>
	}

	return(
	    <Fragment>
		<Grid container spacing={3}>
		    <Grid item sm xs ms={4}>
			<div className={"card"}>
			    <div className={"card-header"}>
				Issue Submission
			    </div>
			    <div className={"card-body"}>
				<FormControl fullWidth sx={{ m: 1 }}>
				    <InputLabel htmlFor="issue_subject">Subject:</InputLabel>
				    <OutlinedInput
					id="issue_subject"
					label="Subject:"
					type={"text"}
				    />
				</FormControl>
				<FormControl fullWidth sx={{ m: 1 }}>
				    <InputLabel htmlFor="issue_message">Issue Message:</InputLabel>
				    <OutlinedInput
					id="issue_message"
					label="Message:"
					type={"text"}
				    />
				</FormControl>
				<FormControl fullWidth sx={{ m: 2 }}>
				    <Button variant={"outlined"} onClick={this.handleIssue}>
					Submit Issue
				    </Button>
				</FormControl>
			    </div>
			</div>
		    </Grid>
		</Grid>
	    </Fragment>
	)
    }
}

function mapStateToProps({authedUser, section, course}) {
    return {
	authedUser,
	section,
	course
    }
}

export default connect(mapStateToProps)(AddIssueContainer)
