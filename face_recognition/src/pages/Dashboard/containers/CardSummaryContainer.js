import React, {Component, Fragment} from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import CardSummaryView from "../components/CardSummaryView";

class CardSummaryContainer extends Component{
    render() {
        return(
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Course(s)"}
                            amount={this.props.courses}
                        />
                    </Grid>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Issue(s)"}
                            amount={this.props.issues}
                        />
                    </Grid>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Student(s)"}
                            amount={this.props.students}
                        />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
function mapStateToProps({issues, students, schedule}){
    let numberIssues = Object.values(issues).reduce((n, e)=>e.status ==='Unresolved'?n+1:n, 0)
    let numberCourses = Object.values(schedule).reduce((n,e)=>e.course === e.course?n+1:n, 0)
    return{
        issues: numberIssues,
        students: Object.values(students).length,
        courses:numberCourses
    }
}
export default connect(mapStateToProps)(CardSummaryContainer)