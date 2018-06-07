/**
 * @fileOverview
 * @author bian17888 2018/6/7 13:58
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	const timestamp = new Date().getTime();
	const filename = 'trace_' + timestamp + '.json'

	await page.setViewport({width: 1280, height: 800});

	await page.tracing.start({path: filename, screenshots: true});
	await page.goto('https://www.aliyun.com');
	await page.tracing.stop();

	// --- extracting data from trace.json ---
	const tracing = JSON.parse(fs.readFileSync(filename, 'utf8'));
	const traceScreenshots = tracing.traceEvents.filter(x => (
		x.cat === 'disabled-by-default-devtools.screenshot' &&
		x.name === 'Screenshot' &&
		typeof x.args !== 'undefined' &&
		typeof x.args.snapshot !== 'undefined'
	));
	traceScreenshots.forEach(function (snap, index) {
		fs.writeFile(snap.ts + '.png', snap.args.snapshot, 'base64', function (err) {
			if (err) {
				console.log('writeFile error', err);
			}
		});
	});
	// --- end extracting data from trace.json ---

	await browser.close();
})();
