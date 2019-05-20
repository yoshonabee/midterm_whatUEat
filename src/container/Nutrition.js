import React from 'react'
import {Redirect} from 'react-router-dom'
import './../styles.css'

class Nutrition extends React.Component {
	constructor(props) {
		super(props)
		this.state = {back: false}
	}

	componentDidMount() {
		this.props.socket.on('deleteDone', () => {
			this.setState(() => ({back: true}))
		})
	}

	render() {
		if (this.state.back) {
			return <Redirect push to="/record" />
		}

		return (
			<div className='main'>
				<div>
					<h1>Recording Info</h1>
				</div>
				<ul className="list-unstyled">
					<li>Date: {this.props.item.date}</li>
					<li>Name: {this.props.item.name}</li>
					<li>Calories: {this.props.item.calories} kcal</li>
					<li>Fat: {this.props.item.fat}g</li>
					<li>Carbonhydrate: {this.props.item.carbonhydrate}g</li>
					<li>Protein: {this.props.item.protein}g</li>
					<li>Sodium: {this.props.item.sodium}mg</li>
				</ul>
				<button onClick={this.back}>back</button>
				<button className="delete-button" onClick={this.delete}>delete</button>
			</div>
		)
	}

	back = () => {
		this.setState(() => ({back: true}))
	}

	delete = () => {
		this.props.socket.emit('delete', this.props.item._id)
	}
}

export default Nutrition