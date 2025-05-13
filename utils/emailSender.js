const nodemailer = require('nodemailer');
require('dotenv').config();

// Update transporter for Gmail using the service 'gmail' (no need for host/port configuration)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // 'gmail' service is pre-configured
  auth: {
    user: 'shrash.technology@gmail.com',  // Your Gmail address
    pass: 'derd yxde scth kkxw',  // Your Gmail app password
  },
});

async function sendCertificateEmail(to, pdfBuffer) {
  try {
    const info = await transporter.sendMail({
      from: `"Shrash Tech Academy" <${process.env.GMAIL_USER}>`,
      to,
      subject: '🎓 Your Course Certificate',
      text: 'Dear learner,\n\nAttached is your course completion certificate.\n\nBest,\nShrash Tech Team',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
        },
      ],
    });

    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Email send failed:', err.message);
  }
}

module.exports = { sendCertificateEmail };
