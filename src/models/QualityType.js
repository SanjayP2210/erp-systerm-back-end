// Define the schema for a todo item
const mongoose = require('mongoose');

  
const QualityType =  new mongoose.Schema({
	label: {
		type: String,
		required: [true, "Label is required"],
	},
	value: {
		type: String,
		required: [true, "Value is required"],
	},
	disabled: {
		type: Boolean,
	},
});

module.exports = mongoose.model('QualityType', QualityType);
