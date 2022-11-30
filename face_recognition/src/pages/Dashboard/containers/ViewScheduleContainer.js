import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {List, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import ViewScheduleComponent from "../components/ViewScheduleComponent";

class ViewScheduleContainer extends Component{
    state = {
        schedules:[]
    }
    componentDidMount() {
        this.setState({
            schedules: Object.values(this.props.schedule).reduce((result,currentValue)=>{
                (result[currentValue.section] = result[currentValue.section] || []).push(
                    currentValue
                );
                return result;
            },{})
        })
    }

    render() {
        if (this.state.schedules.length === 0){
            return (
                <div>Loading</div>
            )
        }
        const {schedule} = this.props
        return(
            <>
                {Object.keys(this.state.schedules).map(r=>(
                    <ViewScheduleComponent
                        key={r}
                        id={r}
                        schedule={Object.values(schedule).filter((s,i)=>{return s.section===parseInt(r)})}
                    />
                ))}
            </>
        )
    }
}

function mapStateToProps({schedule}){
    return{
        schedule
    }
}
export default connect(mapStateToProps)(ViewScheduleContainer)