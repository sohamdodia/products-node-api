const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');

const productController = require('./controllers/products');
const myProductController = require('./controllers/products.my');
const productIDController = require('./controllers/products.id');
const addProductController = require('./controllers/products.add');
const loginController = require('./controllers/login');
const signupController = require('./controllers/signup');
const productSearchController = require('./controllers/products.search');

mongoose.init();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/products', productController.GET);

app.get('/products/my', myProductController.GET);

app.get('/products/search/:query', productSearchController.GET);

app.get('/products/:id', productIDController.GET);

app.post('/products/add', addProductController.POST);

app.delete('/products/:id', productIDController.DELETE);

app.patch('/products/:id', productIDController.PATCH);

app.post('/login', loginController.POST);

app.post('/signup', signupController.POST);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = {app};