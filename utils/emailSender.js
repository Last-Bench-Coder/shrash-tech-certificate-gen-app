const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendCertificateEmail(to, downloadURL, certificate) {
  try {
    const mailOptions = {
      from: `"${certificate.instituteName || 'Shrash Tech Academy'}" <${process.env.GMAIL_USER}>`,
      to,
      subject: '🎓 Your Certificate is Ready!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center;">
            <img src="${certificate.instituteLogo}" alt="Institute Logo" style="max-width: 120px; height: auto;" />
            <h2 style="margin-top: 10px; color: #333;">${certificate.instituteName}</h2>
          </div>

          <!-- Body -->
          <div style="padding: 30px; color: #333;">
            <p>Dear ${certificate.studentName || 'Learner'},</p>
            <p style="font-size: 16px;">
              Congratulations on successfully completing the <strong>${certificate.courseName}</strong> course!
            </p>
            <p>
              Your certificate is now ready for download. Please click the button below to download your certificate (PDF format).
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${downloadURL}" target="_blank" style="background-color: #007BFF; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Download Certificate
              </a>
            </div>

            <p>If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br/>${certificate.signatureName || 'Shrash Tech Team'}</p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 13px; color: #666;">
            <div>${certificate.instituteAddress}</div>
            <div style="margin-top: 5px;">
              Phone: ${certificate.institutePhone} | Email: <a href="mailto:${certificate.instituteEmail}" style="color: #555;">${certificate.instituteEmail}</a>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
}

module.exports = { sendCertificateEmail };
