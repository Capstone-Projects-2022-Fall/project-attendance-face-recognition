import React, {Component, Fragment} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {getAttendanceSummary} from "../../../utils/api/api";
import {connect} from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class StatisticalReportContainer extends Component{
    state = {
        data:{
            labels:[],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Dataset 2',
                    data: [],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
    }
    componentDidMount() {
        const {isInstructor} = this.props
        if (isInstructor.instructor) {
            getAttendanceSummary()
                .then((result) => {
                    console.log(Object.values(result.present))
                    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        "October", "November", 'December'];
                    this.setState({
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Present',
                                    data: Object.values(result.present),
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                                {
                                    label: 'Late',
                                    data: Object.values(result.late),
                                    backgroundColor: 'rgba(252,176,0,0.95)',
                                },
                                {
                                    label: 'Absent',
                                    data: Object.values(result.absent),
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        }
                    })
                })
        }
    }

    render() {
        const {isInstructor} = this.props
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Attendance Summary',
                },
            },
        };
        if (isInstructor.instructor) {
            return (
                <div className={"card"}>
                    <div className={"card-body"}>
                        <Bar options={options} data={this.state.data}/>
                    </div>
                </div>
            )
        }
        return (
            <Fragment></Fragment>
        )
    }
}

function mapStateToProps({isInstructor}){
    return {
        isInstructor,
    }
}
export default connect(mapStateToProps)(StatisticalReportContainer)