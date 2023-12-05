// Define the schema for a todo item
const mongoose = require('mongoose');
[
	"PartyID"= 0,
	"PartyName"= "",
	"Category"= "",
	"GroupName"= "",
	"Industry"= "",
	"Region"= "",
	"Type"= "Supplier",
	"PONos"= 0,
	"Status"= ""
];
  
const PurchaseOrder =  new mongoose.Schema({
	party_Id: {
		type: Number,
	},
	party_name: {
		type: String,
		required: [true, "party_name required"],
	},
	category: {
		type: String,
		required: [true, "category is required"],
	},
	group_name: {
		type: String,
		required: [true, "group_name  is required"],
	},
	industry:{
		type: String,
		required: [true, "industry is required"],
	},
    region:{
		type: String,
		required: [true, "Region is required"],
	},
    type:{
		type: String,
		required: [true, "Type is required"],
	},
    po_Nos:{
		type: String,
		required: [true, "po_Nos is required"],
	},
    status:{
		type: String,
		required: [true, "Status is required"],
	},
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrder);
