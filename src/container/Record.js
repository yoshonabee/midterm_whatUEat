import React from 'react'
import './../styles.css'
import RecordBoard from "./RecordBoard"
import {NavLink} from "react-router-dom"

function addDays(date, days) {
	let d = new Date(date.valueOf())
	d.setDate(d.getDate() + days)
	return d
}

class Record extends React.Component {
	constructor(props) {
		super(props)
		let d = new Date()
		d = addDays(d, -d.getDay())
		this.state = {
			day: d,
			input_year: '',
			input_month: '',
			input_day: ''
		}
	}

	render() {
		return (
			<div className='main'>
				<div>
					<h1>Nutrition Recorder</h1>
				</div>

				<div>
					<NavLink to="/new-record"><button className="orange-button">New</button></NavLink>
					<div>
						<button className="switch-week" onClick={this.previousWeek}>Previous Week</button>
						<button className="switch-week" onClick={this.nextWeek}>Next Week</button>
					</div>
					<div className="date-query">
						<input id="input_year" value={this.state.input_year} className="date-input" onChange={e => this.onChangeNumber(e)} placeHolder="yyyy" />-
						<input id="input_month" value={this.state.input_month} className="date-input" onChange={e => this.onChangeNumber(e)} placeHolder="mm"/>-
						<input id="input_day" value={this.state.input_day} className="date-input" onChange={e => this.onChangeNumber(e)} placeHolder="dd" />
						<button onClick={this.jumpDate}>Jump to date</button>
					</div>
				</div>
				<div className="record-board-container">
					<RecordBoard day={this.state.day} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 1)} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 2)} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 3)} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 4)} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 5)} socket={this.props.socket}/>
					<RecordBoard day={addDays(this.state.day, 6)} socket={this.props.socket}/>
				</div>
			</div>
		)
	}

	previousWeek = () => {
		this.setState((state, props) => ({day: addDays(state.day, -7)}))
	}

	nextWeek = () => {
		this.setState((state, props) => ({day: addDays(state.day, 7)}))
	}

	onChangeNumber(e) {
		let target = e.target

		if (isNaN(target.value))
			return

		this.setState((state, props) => {
			state[target.id] = target.value
			return state
		})
	}

	jumpDate = () => {
		if (this.state.input_year === '' || this.state.input_month === '' || this.state.input_day === '')
			return

		let d = new Date(this.state.input_year, this.state.input_month - 1, this.state.input_day)
		d = addDays(d, -d.getDay())

		this.setState(() => ({
			day: d,
			input_year: '',
			input_month: '',
			input_day: ''
		}))
	}
}

export default Record