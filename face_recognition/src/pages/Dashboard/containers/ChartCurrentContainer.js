import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import ChartCurrentComponent from "../components/ChartCurrentComponent";

class ChartCurrentContainer extends Component{
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
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }
    render() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return(
            <Fragment>
                <div className="card">
                    <div className={"card-body App"}>
                        Today's Attendance
                    </div>
                    <div className={"card-body"}>
                        <ChartCurrentComponent
                            data={this.state.data}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(ChartCurrentContainer)