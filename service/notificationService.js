import nodemailer from 'nodemailer';

 const sendNotification = async (recipientEmail, subject, message) => {
    try {
        // Create a nodemailer transporter using your email service provider's SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rehanalire52@gmail.com',
                pass: 'rehan55960'
            }
        });

        const mailOptions = {
            from: 'Your Company <your-email@example.com>',
            to: recipientEmail,
            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email notification sent:', info.messageId);
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
};

export default sendNotification;
