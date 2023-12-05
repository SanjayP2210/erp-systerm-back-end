const mongoose = require("mongoose");

module.exports = () => {
	const connection = mongoose
		.connect(process.env.DATABASE_URL+ process.env.DATABASE_NAME, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		  })
		.then((result) => {
			console.log("Connected to database");
			return result;
		} )
		.catch((err) => {
			console.log("could not connect to database", err);
		});
	return connection;
};