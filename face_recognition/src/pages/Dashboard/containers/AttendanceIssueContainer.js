import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import AttendanceIssueView from "../components/AttendanceIssueView";

class AttendanceIssueContainer extends Component{
    state = {
        columns : [
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
            }
        ],
    }
    render() {
        const {issues} = this.props
        return(
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
        )
    }
}

function mapStateToProps({issues}){
    return{
        issues
    }
}

export default connect(mapStateToProps)(AttendanceIssueContainer)