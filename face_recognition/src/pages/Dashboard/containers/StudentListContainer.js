import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import DataTable from 'react-data-table-component';


class StudentListContainer extends Component{
    state = {
        columns: [
            {
                name: "First Name",
                selector: row => row.first_name,
                sortable: true
            },
            {
                name: "Last Name",
                selector: row => row.last_name,
                sortable: true
            },
            {
                name: "Email",
                selector: row => row.email,
                sortable: true
            },
            {
                name: "Course",
                selector: row => row.course,
                sortable: true
            },
            {
                name: "Section",
                selector: row => row.section
            }
        ],
        data: [
            {
                id:1,
                first_name: "Jerry",
                last_name: "Maurice",
                email: "jerrychmaurice@gmail.com",
                course: "Project in Computer Science",
                section: "001"
            },
            {
                id:2,
                first_name: "John",
                last_name: "Maurice",
                email: "jerrychmaurice@gmail.com",
                course: "Project in Computer Science",
                section: "001"
            },
        ]
    }
    render() {
        return (
            <div className={"card"}>
                <div className={"card-body"}>
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.data}
                        pagination
                        />
                </div>
            </div>
        );
    }
}

export default connect()(StudentListContainer)