import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import RecentUserComponent from "../components/RecentUserComponent";

class RecentUserContainer extends Component{
    render() {
        return (
            <div className={"card"}>
                <div className={"card-body App"}>
                    Recent Attendance
                </div>
                <div className={"card-body"}>
                    <RecentUserComponent/>
                </div>
            </div>
        );
    }
}

export default connect()(RecentUserContainer)