import React, {Component, Fragment} from 'react'
import ChartCurrentComponent from "../../Dashboard/components/ChartCurrentComponent";
import {getSectionNumSummary} from "../../../utils/api/api";
import {connect} from "react-redux";

class SectionNumChartContainer extends Component{
    state = {
        data : {
            labels: ['Absent', 'Late', 'Present'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [2, 3, 15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(192,75,128,0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgb(192,75,128)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }
    componentDidMount() {
        const {isInstructor} = this.props
        if (isInstructor.instructor){
            getSectionNumSummary()
                .then((result)=>{
                    this.setState({
                        data : {
                            labels: Object.keys(result),
                            datasets: [
                                {
                                    label: '# of Votes',
                                    data: Object.values(result),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(192,75,128,0.5)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgb(192,75,128)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }
                    })
                })
        }
    }

    render() {
        const {isInstructor} = this.props
        if (isInstructor.instructor){
            return(
                <div className="card">
                    <div className={"card-body App"}>
                        Number of Students in section
                    </div>
                    <div className={"card-body"}>
                        <ChartCurrentComponent
                            data={this.state.data}
                        />
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
export default connect(mapStateToProps)(SectionNumChartContainer)
