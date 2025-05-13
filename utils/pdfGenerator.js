const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');
const chromium = require('chrome-aws-lambda');

async function generateCertificatePDF(data) {
  const templatePath = path.join(__dirname, '../templates/certificateTemplate.html');
  const templateHtml = await fs.readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateHtml);
  const html = template(data);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath || undefined,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  return pdfBuffer;
}

module.exports = { generateCertificatePDF };
