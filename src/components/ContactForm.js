import React, {useState} from 'react'
import styled from 'styled-components'
import emailjs from 'emailjs-com'

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
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)

    function sendEmail(e) {
      e.preventDefault()

      emailjs.sendForm(
        "service_ibbgc9v",
        "template_aqpnmjc",
        e.target,
        "user_Mma9RqfBK6lMSH5vZ5C4R"
      ).then(res =>{
        setSent(true)
      }).catch(err=> console.log(err))
    }
    return (
        <FormStyles>
            <form onSubmit={sendEmail}>
                <div className="form-group">
                  <label style={{color: "#fff"}} htmlFor="name">Your name
                  <input type="text" id="name" name="name" value={name} onChange={(e)=> setname(e.target.value)} />
                  </label>
                </div>
                <div className="form-group">
                  <label style={{color: "#fff"}} htmlFor="email">Your email
                  <input type="text" id="email" name="email" email="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  </label>
                </div>
                <div className="form-group">
                  <label style={{color: "#fff"}} htmlFor="message">Your message
                  <textarea type="text" id="message" name="message" message="message" value={message} onChange={(e)=> setMessage(e.target.value)} />
                  </label>
                </div>
                <div className="btnWrapper">
                <button type="submit">Send</button>
                {sent ? <h3 className="text-success text-capitalize mt-3">Sent Successfully!</h3> : null}

                </div>
            </form>
        </FormStyles>
    )
}

export default ContactForm
