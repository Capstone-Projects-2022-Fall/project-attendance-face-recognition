import React, {Component, Fragment} from 'react';
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import {
	FormControl,
	InputLabel,
	List,
	ListItem,
	OutlinedInput,
	Select,
	Table, TableBody, TableCell,
	TableHead, TableRow,
	TextField
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {scheduleAdditionAPI} from "../../../utils/api/api";
import {NavLink} from 'react-router-dom';
import AddScheduleComponent from "../components/AddScheduleComponent";
import {handleDeleteSchedule, handleSectionSchedule} from "../../../redux/action/schedule";
import ViewScheduleContainer from "../../../container/ViewScheduleContainer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

class AddScheduleContainer extends Component {

    state = {
		dateSelected:"",
		section_name:"",
		weekday:0,
		start_time:"12:30",
		end_time:"12:30",
		duration:5,
		schedules_list:[]
    }

	componentDidMount() {
		const {schedule} = this.props
		this.setState({
			schedules_list: Object.entries(schedule).filter((s,i)=>{
				return s[1].section === this.props.section.id
			})
		})
	}

	handleChange = (e, field)=>{
		this.setState({
			[field]:e.target.value
		})
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const body = {
			"section": this.props.section.id,
			"weekday": this.state.weekday,
			"start_time": this.state.start_time,
			"end_time": this.state.end_time,
			"duration": this.state.duration,
		}
		this.props.dispatch(handleSectionSchedule(body))
			.then(()=>{
				const {schedule} = this.props
				this.setState({
					schedules_list: Object.entries(schedule).filter((s,i)=>{
						return s[1].section === this.props.section.id
					})
				})
			})
	}
	DayOfWeek = (weekday)=>{
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
		return days[weekday]
	}
	deleteSchedule = (e,id)=>{
		e.preventDefault()
		this.props.dispatch(handleDeleteSchedule(id))
			.then(()=>{
				const {schedule} = this.props
				this.setState({
					schedules_list: Object.entries(schedule).filter((s,i)=>{
						return s[1].section === this.props.section.id
					})
				})
			})
	}

	render() {
		const propsValue = {
			section_name: this.state.section_name,
			weekday: this.state.weekday,
			start_time:this.state.start_time,
			end_time:this.state.end_time,
			duration: this.state.duration
		}
		return(
			<Grid container spacing={3}>
				<Grid item sm xs md={6}>
					<AddScheduleComponent
						section = {this.props.section}
						object={propsValue}
						onChangeValue={this.handleChange}
						onSubmit = {this.handleSubmit}
						prevStep={this.props.prevStep}
					/>
				</Grid>
				<Grid item sm xs md={6}>
					<div className={"card"}>
						<div className={"card-header"}>
							Schedule: {this.props.section.name}
						</div>
						<div className={"card-body"}>
							<Table sx={{ minWidth: 150 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Day</TableCell>
										<TableCell>Start Time</TableCell>
										<TableCell>End Time</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.schedules_list.map(r=>(
										<TableRow>
											<TableCell>{this.DayOfWeek(r[1].weekday)}</TableCell>
											<TableCell>{r[1].start_time}</TableCell>
											<TableCell>{r[1].end_time}</TableCell>
											<TableCell>
												<Button
													onClick={(e)=>this.deleteSchedule(e,r[1].id)}
												>
													delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>

							</Table>
						</div>
					</div>
				</Grid>
			</Grid>
		)
	}
}
function mapStateToProps({schedule}){
	return{
		schedule
	}
}

export default connect(mapStateToProps)(AddScheduleContainer)
