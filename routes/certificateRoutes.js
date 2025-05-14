const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const Certificate = require('../models/Certificate');
const EmailStatus = require('../models/EmailStatus');
const { sendCertificateEmail } = require('../utils/emailSender');

// Utility function to populate template
function populateTemplate(html, data) {
  return html
    .replace(/{{studentName}}/g, data.studentName)
    .replace(/{{courseName}}/g, data.courseName)
    .replace(/{{date}}/g, new Date(data.date).toLocaleDateString())
    .replace(/{{certificateId}}/g, data.certificateId)
    .replace(/{{instituteName}}/g, data.instituteName || 'Shrash Tech Academy')
    .replace(/{{instituteAddress}}/g, data.instituteAddress || '123 Main St, City, Country')
    .replace(/{{logo}}/g, data.instituteLogo || process.env.LOGO_IMAGE_URL)
    .replace(/{{signatureName}}/g, data.signatureName || process.env.SIGNATURE);
}

// POST route for creating a certificate
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      courseName,
      date,
      email,
      phone,
      instituteName,
      instituteAddress,
      institutePhone,
      instituteEmail,
      instituteLogo,
      signatureName
    } = req.body;

    const certificateId = Date.now().toString();

    const certificate = new Certificate({
      studentName,
      courseName,
      date,
      email,
      phone,
      instituteName,
      instituteAddress,
      institutePhone,
      instituteEmail,
      instituteLogo,
      signatureName,
      certificateId,
      htmlContent,
      status
    });

    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../templates/certificateTemplate.html'), 'utf8');
    const populatedHTML = populateTemplate(htmlTemplate, certificate);

    certificate.htmlContent = populatedHTML;
    certificate.status = 'Created';

    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to email the certificate as PDF
router.post('/:id/send', async (req, res) => {
  let certificate;

  try {
    const { downloadURL } = req.body;

    if (!downloadURL) {
      return res.status(400).send('Download URL is required in the request body.');
    }

    certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).send('Certificate not found');

    await sendCertificateEmail(certificate.email, downloadURL, certificate);

    const emailStatus = new EmailStatus({
      email: certificate.email,
      status: 'sent',
      certificateId: certificate._id,
    });
    await emailStatus.save();

    res.send('Certificate emailed successfully.');
  } catch (err) {
    const emailStatus = new EmailStatus({
      email: certificate?.email || 'unknown',
      status: 'failed',
      errorMessage: err.message,
      certificateId: certificate?._id || 'unknown',
    });
    await emailStatus.save();

    res.status(500).send(err.message);
  }
});

// GET email statuses filtered by email
router.get('/email-status', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};
    const emailStatuses = await EmailStatus.find(filter);
    res.json(emailStatuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
