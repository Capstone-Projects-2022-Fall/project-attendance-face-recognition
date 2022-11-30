import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {handleAddAttendance, handleGetAttendance} from "../../../redux/action/attendance";
import DataTable from "react-data-table-component";

class ViewAttendanceContainer extends Component{
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
    ws = new WebSocket(`ws://localhost:5000/ws/attendance/`);
    componentDidMount() {
        const {section, authedUser} = this.props
        this.props.dispatch(handleGetAttendance())
            .then(()=>{
            })
        if (section.name.length !== 0){
            this.ws.onopen = ()=>{
                console.log("connected")
                this.ws.send(JSON.stringify({
                    "type": "subscribe",
                    "id": Math.floor(Math.random() * 5000),
                    "model": "attendance.Attendance",
                    "action": "list",
                    "view_kwargs": {
                        "section": section.id,
                        "user": authedUser.id
                    }
                }))
            }
            this.ws.onclose = () => {
                console.log("closed");
            };
            this.ws.onmessage = ev => {
                console.log(ev.data)
                console.log(JSON.parse(ev.data).instance)
                this.props.dispatch(handleAddAttendance(JSON.parse(ev.data).instance))
            }
        }
    }

    render() {
        const {attendance} = this.props
        return(
            <Fragment>
                <div className={"card"}>
                    <div className={"card-header"}>
                        Monitoring Attendance
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <DataTable
                            columns={this.state.columns}
                            data={Object.values(attendance)}
                            pagination
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({attendance, section, authedUser}){
    return{
        attendance,
        section,
        authedUser
    }
}
export default connect(mapStateToProps)(ViewAttendanceContainer)