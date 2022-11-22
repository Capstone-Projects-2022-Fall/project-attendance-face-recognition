import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import Avatar from "@mui/material/Avatar";
import WatchLaterIcon from '@mui/icons-material/WatchLater';


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
    expandedComponent = ({data})=>{
        let mySchedule = data.schedule.split(";")
        mySchedule.pop();
        return (
            mySchedule.map((schedule)=>(
                <Fragment>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WatchLaterIcon
                                    fontSize={"small"}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={(schedule.split(":"))[0]}
                            secondary={(schedule)}
                        />
                    </ListItem>
                </Fragment>
            ))
        )
    }
    render(){
        const {schedule} = this.props

        return(
	    <Fragment>
		<div className={"card"}>
		    <Button color={"inherit"}>
			Import Course(s) From Canvas
		    </Button>
		</div>
		<div className={"card"}>
		    <div className={"card-body"}>
			<DataTable
			    columns={this.state.columns}
			    data={Object.values(schedule)}
			    pagination
			    dense
			    expandableRows
			    expandableRowsComponent={this.expandedComponent}
			/>
		    </div>
		</div>
	    </Fragment>
	)
    }
}

function mapStateToProps({schedule}){
    return{
        schedule
    }
}

export default connect(mapStateToProps)(CourseSectionListContainer)
