/**
 * @fileOverview
 * @author bian17888 2018/5/14 10:10
 */

const request = require('request');

exports.sendToDingTalk = (url, data, callback) => {
	let dingData = {
		"msgtype": "text",
		"text"   : {
			"content": ""
		}
	};
	let option = {
		url   : url,
		method: 'POST',
		json  : true,
		body  : dingData
	};

	dingData.text.content = JSON.stringify(data);
	request(option, function (err, httpResponse, body) {
		if (httpResponse.statusCode === 200) {
			callback();
		}
	});
}
