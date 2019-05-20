import React from 'react'
import {NavLink} from 'react-router-dom'
import './../styles.css'

export default ({item}) => {
	return (
		<div>
			<NavLink>{`${item.name}`}</NavLink>
		</div>
	)
}