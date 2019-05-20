import React from 'react'
import './../styles.css'
import { Switch, Route, Redirect} from 'react-router-dom'
import Record from './../container/Record'
import NewRecord from './../container/NewRecord'
import NutritionRender from './../container/NutritionRender'

export default ({socket}) => {
 	return (
		<div>
			<aside></aside>

			<Switch>
				<Redirect exact from="/record" to="/" />
				<Route exact path="/" component={() => <Record socket={socket} />} />
				<Route path="/record/:id?" component={(props) => <NutritionRender socket={socket} {...props}/>} />
				<Route path="/new-record" component={() => <NewRecord socket={socket} />} />
			</Switch>
		</div>
	)
 }