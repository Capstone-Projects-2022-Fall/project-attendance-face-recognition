import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import DataTable from 'react-data-table-component';

class RecordListContainer extends Component{
    state = {
        columns: [
            {
                name: "Name",
                selector: row => row.studentName,
                sortable: true
            },
            {
                name: "Date",
                selector: row => row.recordedDate,
                sortable: true
            },
            {
                name: "Course",
                selector: row => row.displayCourse,
                sortable: true
            },
            {
                name: "Section",
                selector: row => row.displaySection,
                sortable: true
            },
            {
                name: "Status",
                selector: row => row.status,
                sortable: true
            }
        ],
    }
    render() {
        const {report} = this.props
        return(
            <Fragment>
                <h2>Report</h2>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <DataTable
                            columns={this.state.columns}
                            data={Object.values(report)}
                            pagination
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({report}){
    return{
        report
    }
}

export default connect(mapStateToProps)(RecordListContainer)