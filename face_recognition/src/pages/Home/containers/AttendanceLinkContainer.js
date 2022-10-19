import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

class AttendanceLinkContainer extends Component{
    render() {
        const {course, section, isAvailable} = this.props
        return(
            <Fragment>
                {isAvailable === true?(
                    <Fragment>
                        <p>
                            {course.name} - {section.name}
                        </p>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color={"info"} component={NavLink} to="/attendance">
                                Record Attendance
                            </Button>
                            <Button variant="outlined" color={"info"}>
                                View Report
                            </Button>
                        </Stack>
                    </Fragment>
                ): (
                    <Fragment>
                        <p>
                            You don't have a scheduled class at this time. If this is an error, please contact your instructor
                        </p>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color={"info"} disabled>
                                Record Attendance
                            </Button>
                            <Button variant="outlined" color={"info"}>
                                View Report
                            </Button>
                        </Stack>
                    </Fragment>
                )}
            </Fragment>
        )
    }
}

function mapStateToProps({course, section}){
    return{
        course,
        section,
        isAvailable: Object.keys(course).length!==0
    }
}
export default connect(mapStateToProps)(AttendanceLinkContainer)