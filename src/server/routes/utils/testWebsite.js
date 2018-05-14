/**
 * @fileOverview
 * @author bian17888 2018/5/13 17:49
 */

const USERNAME_SELECTOR = '#fm-login-id';
const PASSWORD_SELECTOR = '#fm-login-password';
const BUTTON_SELECTOR = '#fm-login-submit';

const puppeteer = require('puppeteer');

/**
 * 主程序
 * @param data
 * @returns {Promise<Array>}
 */
exports.run = async (data) => {
	const that = this;
	let result = [];

	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	// 初始化设置
	await page.setViewport({width: 1280, height: 800});
	await page.goto(data.setup.loginSite);
	// 登录
	const framework = await page.frames()[1];
	await framework.type(USERNAME_SELECTOR, data.setup.username);
	await framework.type(PASSWORD_SELECTOR, data.setup.password);
	await framework.click(BUTTON_SELECTOR);
	await page.waitForNavigation(0);

	// 执行每个任务
	for (let url of data.task) {
		let obj = {};
		obj[url] = await that.testWebsite(browser, url);
		result.push(obj);
	}

	browser.close();

	return result;
}

/**
 * page 测试逻辑
 * @param browser
 * @param url
 * @returns {Promise<void>}
 */
exports.testWebsite = async (browser, url) => {
	const that = this;
	const page = await browser.newPage();
	await page.setViewport({width: 1024, height: 1024});
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
