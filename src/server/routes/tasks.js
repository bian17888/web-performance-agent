/**
 * @file performance
 * @author bian17888 2018/5/13 20:50
 */

const testWebsite = require('./utils/testWebsite');
const dingApi = require('./utils/dingApi');

/*
 * POST create a new task.
 */
exports.createTask = async (req, res, next) => {
	// 入参的数据结构
	// req.body = {
	// 	"dingTalk": "",
	// 	"task": [
	// 		"https://rdsnew.console.aliyun.com/#/rdsList/basic/"
	// 	],
	// 	"cookies": []
	// };

	// test the website
	let result = await testWebsite.run(req.body);

	// send data with dingding
	dingApi.sendToDingTalk(req.body.dingTalk, result, () => {
		res.send(result);
	});
};

/*
 * GET the performance's task info.
 */
exports.getTaskDetail = async (req, res, next) => {
	res.send('success!');
};
