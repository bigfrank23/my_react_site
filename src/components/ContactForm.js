import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styled from "styled-components";
import Captcha from "./Captcha";
import axios from "axios";

const FormStyles = styled.div`
  width: 100%;
  .form-group {
    width: 100%;
    margin-bottom: 2rem;
  }
  label {
    font-size: 1.8rem;
    font-family: Poppins, sans-serif;
  }
  input,
  textarea {
    width: 100%;
    font-size: 2rem;
    font-family: Poppins, sans-serif;
    padding: 1.2rem;
    color: #bcb4b4;
    background: #221d1c;
    outline: none;
    border: none;
    border-radius: 8px;
    margin-top: 1rem;
  }
  textarea {
    min-height: 250px;
    resize: vertical;
  }
  button[type="submit"] {
    background-color: #bcb4b4;
    color: #000;
    font-size: 2rem;
    font-family: Poppins, sans-serif;
    display: inline-block;
    outline: none;
    border: none;
    padding: 1rem 4rem;
    border-radius: 8px;
    cursor: pointer;
  }
`;

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState("");

  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const handleRequest = async (e) => {
    if (email && name && location && message !== "") {
      e.preventDefault();
      setLoading(true);
      // console.log({email, message, name, subject, company})

      const body = { email, message, name, location };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/contact/",
          body,
          { headers: { "Content-type": "application/json" } }
        );

        setSent(res.data.status);
        setLoading(false);
        console.log(res);
        setEmail("");
        setName("");
        setLocation("");
        setMessage("");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      alert("Please fill all required form");
    }
  };

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  return (
    <FormStyles>
      <form onSubmit={handleRequest}>
        <div className="form-group">
          <label style={{ color: "#fff" }} htmlFor="name">
            Your name
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ color: "#fff" }} htmlFor="location">
            Your location
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ color: "#fff" }} htmlFor="email">
            Your email
            <input
              type="text"
              id="email"
              name="email"
              email="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ color: "#fff" }} htmlFor="message">
            Your message
            <textarea
              type="text"
              id="message"
              name="message"
              message="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>
        <div className="btnWrapper">
          <button type="submit" disabled={!token}>
            {loading ? "Sending..." : "Send"}
          </button>
          <h3 className="text-success text-capitalize mt-3">{sent}</h3>
        </div>
        <HCaptcha
          sitekey={process.env.REACT_APP_CAPTCHA_PUBLIC_KEY}
          onLoad={onLoad}
          onVerify={setToken}
          ref={captchaRef}
          theme="dark"
          size="normal"
        />
      </form>
    </FormStyles>
  );
}

export default ContactForm;
