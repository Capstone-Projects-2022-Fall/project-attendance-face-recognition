import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";


class CourseSectionListContainer extends Component{
    state = {
        columns: [
            {
                name: "Course",
                selector: row => row.course,
                sortable: true
            },
            {
                name: "Section",
                selector: row => row.section,
                sortable: true
            },
            {
                name: "Schedule",
                selector: row => row.schedule,
            }
        ],
    }
    render(){
        const {schedule} = this.props
        return(
            <div className={"card"}>
                <div className={"card-body"}>
                    <DataTable
                        columns={this.state.columns}
                        data={Object.values(schedule)}
                        pagination
                        dense
                        responsive
                    />
                </div>
            </div>
        )
    }
}
function mapStateToProps({schedule}){
    return{
        schedule
    }
}
export default connect(mapStateToProps)(CourseSectionListContainer)