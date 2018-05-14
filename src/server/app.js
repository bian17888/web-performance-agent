/*jshint node:true*/
'use strict';

/**
 * 1 引入依赖
 */
const express = require('express'),
	app = express(),
	asyncHandler = require('express-async-handler'),
	bodyParser = require('body-parser');


const routes = require('./routes');

const port = process.env.PORT || 7203,
	environment = process.env.NODE_ENV;

/**
 * 2 配置Express.js
 */
app.set('appName', 'Agent');

/**
 * 3 连接数据库
 */

/**
 * 4 定义中间件
 */
// third library
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * 5 定义路由
 */
// Pages and routes
app.get('/', routes.index);

// REST API routes
app.post('/api/tasks', routes.tasks.createTask);
app.get('/api/tasks/:taskId', routes.tasks.getTaskDetail);

/**
 * 6 启动应用
 */
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);
switch (environment) {
	case 'product':
		console.log('** PRODUCT **');
		app.use(express.static('./build/'));
		app.use('/*', express.static('./build/index.html'));
		break;
	default:
		console.log('** DEV **');
		app.use(express.static('./src/client/'));
		app.use(express.static('./'));
		app.use(express.static('./tmp'));
		app.use('/*', express.static('./src/client/index.html'));
		break;
}

app.listen(port, function () {
	console.log('Express server listening on port ' + port);
	console.log('env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});

/**
 * 可选 : 在多核系统上启动 cluster 多核处理模块
 */
