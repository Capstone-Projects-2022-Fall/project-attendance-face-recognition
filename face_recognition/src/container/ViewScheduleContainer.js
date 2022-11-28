import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";

class ViewScheduleContainer extends Component{
    state = {
        schedules:[]
    }
    componentDidMount() {
        if (this.props.scheduleList === null){
            this.setState({
                schedules: Object.values(this.props.schedule).reduce((result,currentValue)=>{
                    (result[currentValue.section] = result[currentValue.section] || []).push(
                        currentValue
                    );
                    return result;
                },{})
            })
        }
        else{
            console.log(this.props.scheduleList)
            this.setState({
                schedules: this.props.scheduleList
            })
        }
    }

    render() {
        console.log((this.state.schedules))
        return(
            <></>
        )
    }
}

function mapStateToProps({schedule}){
    console.log(schedule)
    return{
        schedule
    }
}
export default connect(mapStateToProps)(ViewScheduleContainer)