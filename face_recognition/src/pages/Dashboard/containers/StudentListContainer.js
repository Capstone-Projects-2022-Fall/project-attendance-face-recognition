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
    }
    render() {
        const {students} = this.props
        return (
            <div className={"card"}>
                <div className={"card-body"}>
                    <DataTable
                        columns={this.state.columns}
                        data={Object.values(students)}
                        pagination
                        />
                </div>
            </div>
        );
    }
}
function mapStateToProps({students}){
    return{
        students
    }
}
export default connect(mapStateToProps)(StudentListContainer)