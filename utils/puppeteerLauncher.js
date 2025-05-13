// utils/puppeteerLauncher.js
const chromium = require('chrome-aws-lambda');
let puppeteer = null;

async function launchBrowser() {
  if (process.env.AWS_EXECUTION_ENV) {
    // Lambda environment
    return await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  } else {
    // Local development
    if (!puppeteer) puppeteer = require('puppeteer-core');
    return await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome', // or where your Chrome is installed
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
}

module.exports = launchBrowser;
