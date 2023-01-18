import React, { useState } from 'react'
import { hCaptcha } from "@hcaptcha/react-hcaptcha";

const Captcha = () => {
  const [token, setToken] = useState(null);

  const onCaptchaVerify = (token) => {
    setToken(token);
    // You can use this token to validate on your backend
    // (Example: `fetch('/your-server-endpoint', { method: 'POST', body: JSON.stringify({ token }) })`)
  };

  return (
    <div>
      <hCaptcha sitekey={"66a7d104-0e35-4f0c-8d42-8797991d5ffb"} onVerify={onCaptchaVerify} />
      <input type="hidden" name="h-captcha-response" value={token} />
    </div>
  );
};

export default Captcha