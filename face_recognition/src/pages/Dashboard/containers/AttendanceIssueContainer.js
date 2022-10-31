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
        data:[
            {
                id:1,
                name: "Jerry Maurice",
                status: "Unresolved",
                subject: "cannot take attendance",
            },
            {
                id:2,
                name: "Joe Maurice",
                status: "Unresolved",
                subject: "cannot take attendance",
            },
            {
                id:3,
                name: "Claude Maurice",
                status: "Unresolved",
                subject: "cannot take attendance",
            },
            {
                id:4,
                name: "Claude Maurice",
                status: "Unresolved",
                subject: "cannot take attendance",
            },
        ]
    }
    render() {
        return(
            <div className={"card"}>
                <div className={"card-body App"}>
                    Reported Issues
                </div>
                <div className={"card-body"}>
                    <AttendanceIssueView
                        columns={this.state.columns}
                        data={this.state.data}
                        pagination
                    />
                </div>
            </div>
        )
    }
}

export default connect()(AttendanceIssueContainer)