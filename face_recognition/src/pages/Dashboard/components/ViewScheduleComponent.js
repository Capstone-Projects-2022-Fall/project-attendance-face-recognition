import React, {Component, Fragment} from 'react'
import {retrieveSectionCourseInfoAPI} from "../../../utils/api/api";
import Typography from "@mui/material/Typography";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

class ViewScheduleComponent extends Component{
    state = {
        course:"",
        section:"",
    }
    componentDidMount() {
        retrieveSectionCourseInfoAPI(this.props.id)
            .then(r=>{
                this.setState({
                    course: r.course,
                    section: r.section.name,
                })
            })
    }
    DayOfWeek = (weekday)=>{
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return days[weekday]
    }

    render() {
        Object.values(this.props.schedule).map(r=>{
            console.log(r)
        })
        return(
            <div className={"card"}>
                <div className={"card-header"}>
                    {this.state.course} - {this.state.section}
                </div>
                <div className={"card-body"}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Weekday</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(this.props.schedule).map(r=>(
                                <TableRow>
                                    <TableCell>{this.DayOfWeek(r.weekday)}</TableCell>
                                    <TableCell>{r.start_time}</TableCell>
                                    <TableCell>{r.end_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default ViewScheduleComponent

/*
<Table sx={{ minWidth: 150 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course & Section</TableCell>
                        <TableCell>Weekday</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(this.props.schedule).map(r=>(
                        <TableRow
                            key={r.id}
                        >
                            <TableCell>{(r.section)}</TableCell>
                            <TableCell>{(r.weekday)}</TableCell>
                            <TableCell>{r.start_time}</TableCell>
                            <TableCell>{r.end_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
 */