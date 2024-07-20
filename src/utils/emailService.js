const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
