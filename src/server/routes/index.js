exports.tasks = require('./tasks');

/*
 * GET home page.
 */
exports.index = (req, res, next) => {
	res.send('Hello World!');
	// res.render('index', {data: 'mock data'});
};
