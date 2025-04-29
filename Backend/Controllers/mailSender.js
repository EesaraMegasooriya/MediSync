// Controllers/mailSender.js 
const nodemailer = require('nodemailer'); 
const dotenv = require('dotenv'); 
dotenv.config();  

/**  
 * Send an email using nodemailer  
 * @param {string} to - Recipient email address  
 * @param {string} subject - Email subject  
 * @param {string} text - Email body text  
 * @returns {Promise} - Promise resolving when email is sent  
 */ 
const sendEmail = async (to, subject, text) => {
    try {
        console.log(`Attempting to send email to: ${to}`);
        console.log(`With subject: ${subject}`);
        console.log(`Email content length: ${text.length} characters`);

        // Create a transporter with explicit configuration for Gmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER || 'hw79492@gmail.com',
                pass: process.env.EMAIL_PASS || 'ffrk msib emdt jubt',
            },
            // Required for Gmail
            requireTLS: true,
            debug: true, // Enable debug logs
            logger: true // Log info to console
        });
        
        // Create a well-formatted HTML version
        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; padding: 10px; background-color: #4285f4; color: white; border-radius: 5px 5px 0 0;">
                <h2 style="margin: 0;">MediSync</h2>
            </div>
            <div style="padding: 20px;">
                ${text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
            </div>
            <div style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 0 0 5px 5px; font-size: 12px; color: #666;">
                <p>This is an automated message from MediSync Appointment System.</p>
                <p>Email ID: ${Date.now()}</p>
            </div>
        </div>
        `;
        
        // Setup email data with very specific settings for Gmail
        const mailOptions = {
            from: {
                name: 'MediSync Appointment System',
                address: process.env.EMAIL_USER || 'hw79492@gmail.com'
            },
            to: to, // Use the actual recipient email
            subject: subject, // Use the actual subject
            text: text, // Plain text body
            html: htmlContent, // HTML body
            // Headers to improve deliverability
            headers: {
                'Priority': 'high',
                'X-Priority': '1',
                'Importance': 'high',
                'X-MSMail-Priority': 'High'
            }
        };
        
        // Send the email and log results
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}: <${info.messageId}>`);
        console.log('Email preview URL:', nodemailer.getTestMessageUrl(info));
        
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;