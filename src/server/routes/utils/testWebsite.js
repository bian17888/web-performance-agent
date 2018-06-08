/**
 * @fileOverview
 * @author bian17888 2018/5/13 17:49
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/**
 * 主程序
 * @param data
 * @returns {Promise<Array>}
 */
exports.run = async (data) => {
	const that = this;
	const time = new Date();
	let reportFolder = path.join(__dirname, './../../../../report/' + time.getTime());
	let result = [];
	let cookies = data.cookies || [];

	// 初始化设置
	const browser = await puppeteer.launch({
		headless: false,
		args    : ['--no-sandbox', '--disable-setuid-sandbox']
	});

	fs.mkdirSync(reportFolder);
	// 执行每个任务
	for (let url of data.task) {
		let obj = {};
		obj[url] = await that.testWebsite(browser, url, cookies, reportFolder);
		result.push(obj);
	}
	browser.close();

	return result;
}

/**
 * page 测试逻辑
 * @param browser
 * @param url
 * @param cookies
 * @param reportFolder
 * @returns {Promise<void>}
 */
exports.testWebsite = async (browser, url, cookies, reportFolder) => {
	const that = this;
	const taskFolder = path.join(reportFolder, new Date().getTime().toString());
	const page = await browser.newPage();

	// 初始化设置
	await page.setViewport({width: 1280, height: 800});
	await page.setCookie(...cookies);

	// capture filmstrip
	fs.mkdirSync(taskFolder);
	await page.tracing.start({path: taskFolder + '/result.json', screenshots: true});
	await page.goto(url, {waitUntil : 'networkidle0'});
	await page.tracing.stop();

	// export .png form result.json
	that.exportFilmstrip(taskFolder);

	const performanceTiming = JSON.parse(
		await page.evaluate(() => JSON.stringify(window.performance.timing))
	);

	return that.helpers(
		performanceTiming,
		'responseEnd',
		'domInteractive',
		'domContentLoadedEventEnd',
		'loadEventEnd'
	);
}

/**
 * 格式化函数
 * @param timing
 * @param dataNames
 */
exports.helpers = (timing, ...dataNames) => {
	const navigationStart = timing.navigationStart;

	const extractedData = {};
	dataNames.forEach(name => {
		extractedData[name] = timing[name] - navigationStart;
	});

	return extractedData;
}

/**
 * 从json中读取base64图片, 并另存为.png格式
 * @param timing
 * @param dataNames
 */
exports.exportFilmstrip = (folder) => {
	const tracing = JSON.parse(fs.readFileSync(folder + '/result.json', 'utf8'));
	const traceScreenshots = tracing.traceEvents.filter(x => (
		x.cat === 'disabled-by-default-devtools.screenshot' &&
		x.name === 'Screenshot' &&
		typeof x.args !== 'undefined' &&
		typeof x.args.snapshot !== 'undefined'
	));
	traceScreenshots.forEach(function (snap, index) {
		fs.writeFile(folder + '/' + snap.ts + '.png', snap.args.snapshot, 'base64', function (err) {
			if (err) {
				console.log('writeFile error', err);
			}
		});
	});
}
