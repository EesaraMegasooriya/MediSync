// testEmail.js - Place this in your project root
const sendEmail = require('./Controllers/mailSender');
require('dotenv').config();

// Test function to send a test email
async function testEmailDelivery() {
  console.log('==== STARTING EMAIL TEST ====');
  console.log('Email settings:');
  console.log('- User:', process.env.EMAIL_USER || 'hw79492@gmail.com');
  console.log('- Recipient: wr.hashini@gmail.com');
  
  try {
    // Create a test email with a very distinctive subject
    const subject = '🔴 URGENT TEST EMAIL - MediSync ' + Date.now();
    const text = `
IMPORTANT: This is a test email from MediSync with timestamp ${new Date().toISOString()}

Dear Patient,

This is a TEST EMAIL sent from the MediSync system to verify our email delivery.

Please check that this email arrived in your inbox (not spam folder).

If you received this email, please reply to confirm receipt.

Test Details:
- Sent on: ${new Date().toLocaleString()}
- Sender: ${process.env.EMAIL_USER || 'hw79492@gmail.com'}
- Application: MediSync
- Test ID: ${Math.floor(Math.random() * 10000)}

Thank you for helping us test our system!

MediSync Support Team
`;

    // Send the test email
    console.log('Sending test email...');
    const result = await sendEmail('wr.hashini@gmail.com', subject, text);
    
    if (result) {
      console.log('✅ TEST EMAIL SENT SUCCESSFULLY!');
      console.log('Please check both your inbox AND spam folder at wr.hashini@gmail.com');
      console.log('If you still don\'t see the email, check that:');
      console.log('1. Your Gmail app password is correct');
      console.log('2. There are no Gmail sending limits reached');
      console.log('3. The recipient email address is spelled correctly');
    } else {
      console.error('❌ FAILED TO SEND TEST EMAIL!');
      console.error('Please check your email configuration.');
    }
    
  } catch (error) {
    console.error('ERROR IN TEST EMAIL SCRIPT:', error);
  }
}

// Run the test
testEmailDelivery().catch(console.error);