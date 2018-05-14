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
	// let data = {
	// 	"dingTalk" : "https://oapi.dingtalk.com/robot/send?access_token=45e588eabe9c73d335537ec215c1f4dd44e72eb10c5caaedbe5a0a45c15b1b76",
	// 	"setup": {
	// 		"username" : "kai17888@sohu.com",
	// 		"password" : "bK100200",
	// 		"loginSite": "https://account.aliyun.com/login/login.htm"
	// 	},
	// 	"task" : [
	// 		"https://home.console.aliyun.com/new#/",
	// 		"https://ecs.console.aliyun.com/?spm=5176.2020520102.aliyun_sidebar.1.5a6b1eb9eQpiL5"
	// 	]
	// };

	// test the website
	let result = await testWebsite.run(req.body);

	// send data with dingding
	dingApi.sendToDingTalk(req.body.dingTalk, result, ()=>{
		res.send(result);
	});

};

/*
 * GET the performance's task info.
 */
exports.getTaskDetail = async (req, res, next) => {

	let data = {
		"setup": {
			"username" : "kai17888@sohu.com",
			"password" : "bK100200",
			"loginSite": "https://account.aliyun.com/login/login.htm"
		},
		"task" : [
			"https://home.console.aliyun.com/new#/",
			"https://ecs.console.aliyun.com/?spm=5176.2020520102.aliyun_sidebar.1.5a6b1eb9eQpiL5"
		]
	};

	// test the website
	let result = await testWebsite.run(data)

	// todo : send the data to client
	res.send('success!');
};

exports.test = () => {
	console.log('1111');
}


