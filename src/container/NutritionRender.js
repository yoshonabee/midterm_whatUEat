import React from 'react'
import Nutrition from './Nutrition'
import './../styles.css'

class NutritionRender extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		console.log(this.props.match.params.id)
	}

	componentWillMount() {
		this.props.socket.on("oneitem", data => {
			console.log(data)
			this.setState(() => ({item: data}))
		})
	}

	componentDidMount() {
		this.props.socket.emit("oneitem", this.props.match.params.id)
	}

	render() {
		if (this.state.item !== undefined) {
			console.log(this.state.item)
			return (
				<Nutrition item={this.state.item} socket={this.props.socket}/>
			)
		} else {
			return <div></div>
		}
	}
}

export default NutritionRender