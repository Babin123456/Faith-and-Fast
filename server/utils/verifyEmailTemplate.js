const verifyEmailTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 10px; background: #fff; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
  
      <!-- Greeting -->
      <p style="font-size: 20px; font-weight: bold;">Hello ${name},</p>
      
      <!-- OTP Message -->
      <p style="font-size: 16px; line-height: 1.6;">
        Welcome to <strong>Faith AND Fast</strong>! 🎉 We're excited to have you with us.
        To complete your registration, please use the OTP below to verify your email address.
      </p>
  
      <!-- OTP Display -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="font-size: 24px; font-weight: bold; color: #ff8c00;">
          <strong>Your OTP: <span style="color: #333;">${otp}</span></strong>
        </p>
      </div>
  
      <!-- Expiry Information -->
      <p style="font-size: 14px; color: #666; text-align: center;">
        This OTP is valid for <strong>15 minutes</strong> from the time of receiving this email. Please use it promptly.
      </p>
  
      <!-- Security Notice -->
      <p style="font-size: 14px; color: #777;">
        If you didn't sign up for Faith AND Fast, please ignore this email.
        Your OTP is part of the verification process for your registration.
      </p>
  
      <!-- Signature -->
      <p style="font-size: 16px; font-weight: bold; margin-top: 20px;">Best Regards,</p>
      <p style="font-size: 16px; font-weight: bold; color: #ff8c00;">The Faith AND Fast Team</p>
  
      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; text-align: center; color: #777;">
        Need help? Contact us at 
        <a href="mailto:sahilrv191@gmail.com" style="color: #ff8c00; text-decoration: none;">support@faithandfast.com</a>
      </p>
    </div>
  `;
};

export default verifyEmailTemplate;
