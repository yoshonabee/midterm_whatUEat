import React from 'react';
import './../styles.css';
import { BrowserRouter } from 'react-router-dom'
import Container from './Container'

const socket = require('socket.io-client')('http://localhost:3001')

export default () => {
	return (
	    <BrowserRouter>
	      <div>
	        <Container socket={socket} />
	      </div>
	    </BrowserRouter>
    )
}
