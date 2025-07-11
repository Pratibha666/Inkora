const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Hello, ${name}</h2>
      <p style="font-size: 16px; color: #555;">
        You have requested to reset your password. Please use the following OTP to proceed:
      </p>
      <div style="margin: 20px 0; padding: 15px; background-color: #fffae6; border: 1px solid #ffe58f; border-radius: 8px; text-align: center; font-size: 24px; color: #d48806; font-weight: bold;">
        ${otp}
      </div>
      <p style="font-size: 15px; color: #555;">
        This OTP is valid for <strong>5 minutes</strong>. Please enter it on the <strong>Inkora</strong> website to reset your password.
      </p>
      <br/>
      <p style="font-size: 15px; color: #888;">Thank you,<br/>The Inkora Team</p>
    </div>
  `;
};

export default forgotPasswordTemplate;
