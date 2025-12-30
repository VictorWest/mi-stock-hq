export const SEND_OTP_EMAIL_SUBJECT = "Your Verification Code (OTP)";

export const SEND_OTP_EMAIL_CONTENT = (otp: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Your Verification Code</h2>
    <p>Hello,</p>
    <p>Your One-Time Password (OTP) for verification is:</p>

    <div style="
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 4px;
      margin: 20px 0;
      color: #000;
    ">
      ${otp}
    </div>

    <p>This code is valid for the next 10 minutes. If you didn’t request this, you can safely ignore this email.</p>

    <p style="margin-top: 30px;">Regards,<br/>Mi-Inventory Team</p>
  </div>
`;
