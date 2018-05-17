/**
 * @fileOverview
 * @author bian17888 2018/5/13 17:49
 */

const puppeteer = require('puppeteer');

/**
 * 主程序
 * @param data
 * @returns {Promise<Array>}
 */
exports.run = async (data) => {
	const that = this;
	let result = [];
	let cookies = data.cookies || [];

	// 初始化设置
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	// 执行每个任务
	for (let url of data.task) {
		let obj = {};
		obj[url] = await that.testWebsite(browser, url, cookies);
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
 * @returns {Promise<void>}
 */
exports.testWebsite = async (browser, url, cookies) => {
	const that = this;
	const page = await browser.newPage();

	// 初始化设置
	await page.setViewport({width: 1280, height: 800});
	await page.setCookie(...cookies);
	await page.goto(url);

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
