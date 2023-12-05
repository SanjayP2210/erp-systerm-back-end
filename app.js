require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./db");
// Import routes
const todoRoutes = require('./src/routes/todo-api');
const purchaseOrderRoutes = require('./src/routes/purchase-order-api');
const branchRoutes = require('./src/routes/branch-api');
const accountTypeRoutes = require('./src/routes/account-type-api');
const currencyRoutes = require('./src/routes/currency-api');
const qualityTypeRoutes = require('./src/routes/quality-type-api');
const taxTypeRoutes = require('./src/routes/tax-type-api');
const termHeadRoutes = require('./src/routes/term-head-api');
const supplierRoutes = require('./src/routes/supplier-api');

const app = express();
const secretKey = process.env.SECRET_KEY;
// database connection
connection();
app.use(bodyParser.json());
// use to get encoded url when pass from client
app.use(express.urlencoded({ extended: false }))
//use to get the body in request of api 
app.use(express.json())

//sample of get request
app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
})

//add cors for connect with client and do api call from FE
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//todo router
app.use('/api/todos',todoRoutes);
app.use('/api/purchase-order', purchaseOrderRoutes);
app.use('/api/account-type', accountTypeRoutes);
app.use('/api/branch',branchRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/quality-type',qualityTypeRoutes);
app.use('/api/tax-type', taxTypeRoutes);
app.use('/api/term-head', termHeadRoutes);
app.use('/api/supplier',supplierRoutes);

//The 404 Route (always keep this as the last route) also call for unmatched url 
// this is call every time from api call
app.get('*', function(req, res){
    res.send('url not matched', 404);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
