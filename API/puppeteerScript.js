// In .env, SET CWL_USER and CWL_PASSWORD to your CWL login
const puppeteer = require('puppeteer');
require('dotenv').config();
const screenshot = 'permitsPage.png';

(async () => {
	const browser = await puppeteer.launch({
		headless: false
	})
	const page = await browser.newPage()
	await page.goto("https://ebus.parking.ubc.ca/ebusiness/cmn/auth_ext.aspx", {
		waitUntil: 'networkidle2'
	});

	//go to login page
	await page.waitForSelector("[value='UBC CWL Login']");
	await page.click("[value='UBC CWL Login']");

	//enter username
	await page.waitForSelector("[id='username']");
	await page.click("[id='username']");
	await page.type("[id='username']", process.env.CWL_USER);

	//password
	await page.keyboard.down("Tab");
	await page.keyboard.type(process.env.CWL_PASSWORD);

	//submit form
	await page.click("[name='_eventId_proceed']");
	await page.waitForSelector("[id='moreMenuLink']");

	//go to permits page after login
	await page.goto("https://ebus.parking.ubc.ca/ebusiness/cmn/viewpermits.aspx", {
		waitUntil: 'networkidle2'
	});

	await page.waitForSelector(".tableDataColumn");
	await page.screenshot({ path: screenshot });

	browser.close()
	console.log('See screenshot: ' + screenshot)
})()