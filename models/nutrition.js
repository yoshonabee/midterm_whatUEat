const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const NutritionSchema = new Schema({
	date: {
		type: String,
		required: [true, 'Name field is required.']
	},
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	calories: {
		type: Number,
		required: [true, 'Body field is required.']
	},
	carbonhydrate: {
		type: Number,
		required: [true, 'Body field is required.']
	},
	fat: {
		type: Number,
		required: [true, 'Body field is required.']
	},
	protein: {
		type: Number,
		required: [true, 'Body field is required.']
	},
	sodium: {
		type: Number,
		required: [true, 'Body field is required']
	}
})

// Creating a table within database with the defined schema
const Nutrition = mongoose.model('message', NutritionSchema)

// Exporting table for querying and mutating
module.exports = Nutrition
