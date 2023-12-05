// Define the schema for a todo item
const mongoose = require('mongoose');
[
    "Date",
    "PONO",
    "Po Type",
    "Party",
    "Remarks",
    "RefNo",
    "TotalAmount",
    "ReqDate",
    "OCNo",
    "OC Dt",
    "OrderNo",
    "Machine",
    "DelDate",
    "GRN Date",
    "QCType",
    "Entry By",
    "Auth By",
    "st",
    "Att"
];
  
const PurchaseOrder =  new mongoose.Schema({
	date: {
		type: Date,
		required: [true, "Date is required"],
	},
	po_number: {
		type: String,
		required: [true, "PO number required"],
	},
	po_type: {
		type: String,
		required: [true, "po Type is required"],
	},
	party: {
		type: String,
		required: [true, "party"],
	},
	remarks:{
		type: String,
		required: [true, "Remarks is required"],
	},
    ref_no:{
		type: String,
		required: [true, "RefNo is required"],
	},
    total_amount:{
		type: String,
		required: [true, "TotalAmount is required"],
	},
    req_date:{
		type: String,
		required: [true, "ReqDate is required"],
	},
    oc_number:{
		type: String,
		required: [true, "OCNo is required"],
	},
    oc_dt:{
		type: String,
		required: [true, "Dt is required"],
	},
    order_number:{
		type: String,
		required: [true, "OrderNo is required"],
	},
    machine:{
		type: String,
		required: [true, "Machine is required"],
	},
    delivery_date:{
		type: String,
		required: [true, "DelDate is required"],
	},
    grn_date:{
		type: String,
		required: [true, "Date is required"],
	},
    qc_type:{
		type: String,
		required: [true, "QCType is required"],
	},
    entry_by:{
		type: String,
		required: [true, "By is required"],
	},
    auth_by:{
		type: String,
		required: [true, "By is required"],
	},
    st:{
		type: String,
		required: [true, "St is required"],
	},
    at:{
		type: String,
		required: [true, "At is required"],
	},
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrder);
