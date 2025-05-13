const chromium = require('chrome-aws-lambda');

async function launchBrowser() {
  if (process.env.AWS_EXECUTION_ENV || process.env.VERCEL) {
    // Running on AWS Lambda / Vercel
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    // Running locally
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    return browser;
  }
}

module.exports = launchBrowser;
