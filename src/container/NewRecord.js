import React from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import './../styles.css'

class NewRecord extends React.Component {
	constructor(props) {
		super(props)

		let t = new Date()

		this.state = {
			back: false,
			year: t.getFullYear(),
			month: t.getMonth() + 1,
			day: t.getDate(),
			name: '',
			calories: '',
			fat: '',
			protein: '',
			carbonhydrate: '',
			sodium: ''
		}
	}

	render() {
		if (this.state.back) {
			return <Redirect push to="/record" />
		}

		return (
			<div className="main">
				<h1>New Recording</h1>
				<div><b>Date</b></div>
				<div>
					<input className="date-input" id="year" value={this.state.year} onChange={e => this.onChangeNumber(e)} placeHolder="yyyy"></input>-
					<input className="date-input" value={this.state.month} id='month' onChange={e => this.onChangeNumber(e)} placeHolder="mm"></input>-
					<input className="date-input" value={this.state.day} id='day' onChange={e => this.onChangeNumber(e)} placeHolder="dd"></input>
				</div>
				<div><b>Name</b></div>
				<input value={this.state.name} id='name' onChange={e => this.onChange(e)} placeHolder="name of food"></input>
				<div><b>Calories</b></div>
				<input value={this.state.calories} id='calories'onChange={e => this.onChangeNumber(e)} placeHolder="calories in kcal"></input>
				<div><b>Fat</b></div>
				<input value={this.state.fat} id='fat' onChange={e => this.onChangeNumber(e)} placeHolder="fat in g"></input>
				<div><b>Protein</b></div>
				<input value={this.state.protein} id='protein' onChange={e => this.onChangeNumber(e)} placeHolder="protein in g"></input>
				<div><b>Carbonhydrate</b></div>
				<input value={this.state.carbonhydrate} id='carbonhydrate' onChange={e => this.onChangeNumber(e)} placeHolder="carbonhydrate in g"></input>
				<div><b>Sodium</b></div>
				<input value={this.state.sodium} id='sodium' onChange={e => this.onChangeNumber(e)} placeHolder="sodium in mg"></input>
				<NavLink to='/record'><button>cancel</button></NavLink>
				<button className="orange-button" onClick={this.save}>save</button>
			</div>
		)
	}

	onChangeNumber(e){
		let target = e.target

		console.log(target.value)
		if (isNaN(target.value))
			return

		this.setState((state, props) => {
			state[target.id] = target.value
			return state
		})
	}

	onChange(e) {
		let target = e.target

		this.setState((state, props) => {
			state[target.id] = target.value
			return state
		})
	}

	save = () => {
		console.log('save')

		if (this.state.calories === '' || this.state.fat === '' || this.state.day === '' ||
			this.state.name === '' || this.state.protein === '' || this.state.sodium === '' ||
			this.state.year === '' || this.state.month === '' || this.state.carbonhydrate === '') {
			return
		}

		let item = {
			date: `${this.state.year}-${this.state.month}-${this.state.day}`,
			name: this.state.name,
			calories: parseFloat(this.state.calories),
			fat: parseFloat(this.state.fat),
			protein: parseFloat(this.state.protein),
			carbonhydrate: parseFloat(this.state.carbonhydrate),
			sodium: parseFloat(this.state.sodium)
		}

		this.props.socket.emit('input', item)
		this.setState((state, props) => ({back: true}))
	}
}

export default NewRecord