const mongoose = require('mongoose');

const init = () => {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost:27017/Product');
};

module.exports = {
	mongoose,
	init
};
