import React from 'react'
import './../styles.css'
import {NavLink} from 'react-router-dom'
import RecordItem from './../components/RecordItem'

function sameDay(d1, d2) {
	if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate())
		return true
	return false
}

function dateFormatted(date, mode) {
	if (mode === 'object')
		return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
	else
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

class RecordBoard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		console.log('mount')
		this.props.socket.on('output', data => {
			if (sameDay(this.props.day, new Date(data.date))) {
				this.setState((state, props) => ({items: data.items}))
			}
		})

		this.props.socket.emit('recordInit', dateFormatted(this.props.day, 'string'))
	}

	componentWillUpdate(nextProps, nextState) {
		if (sameDay(this.props.day, nextProps.day) === false) {
			console.log('update')
			nextProps.socket.emit('recordInit', dateFormatted(nextProps.day, 'string'))
		}
	}

	render() {
		return (
			<div className="record-board">
				<div className="record-board-date">{dateFormatted(this.props.day, 'string')}</div>
				<div>
					<ul className='list-unstyled'>
						{this.state.items.map((item, key) => <NavLink to={`/record/${item._id}`}><li className="text-white record-board-items">{item.name}</li></NavLink>)}
					</ul>
				</div>

				<div className="total-info">
					{this.totalNutrition()}
				</div>
			</div>
		)
	}

	totalNutrition() {
		let calories = 0
		let fat = 0
		let carbonhydrate = 0
		let protein = 0
		let sodium = 0

		for (let item of this.state.items) {
			calories += item.calories
			fat += item.fat
			carbonhydrate += item.carbonhydrate
			protein += item.protein
			sodium += item.sodium
		}

		return (
			<ul className="list-unstyled align-bottom">
				<li>Calories: {calories} kcal</li>
				<li>Fat: {fat}g</li>
				<li>CHO: {carbonhydrate}g</li>
				<li>Protein: {protein}g</li>
				<li>Sodium: {sodium}mg</li>
			</ul>
		)
	}
}

export default RecordBoard