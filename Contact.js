import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import './Contact.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="contact-form-wrapper py-5">
        <div className="container">
          <h2 className="text-center mb-4 section-title">Na Kontaktoni</h2>

          {submitted ? (
            <div className="thank-you-message text-center">
              <h3>Faleminderit që na kontaktuat!</h3>
              <p>Ne do t'ju kontaktojmë së shpejti.</p>
            </div>
          ) : (
            <form className="contact-form mx-auto" onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control modern-input"
                    placeholder="Emri Juaj"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control modern-input"
                    placeholder="Email-i Juaj"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control modern-input"
                    placeholder="Subjekti"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control modern-input"
                    rows="6"
                    placeholder="Mesazhi Juaj"
                    required
                  ></textarea>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn submit-btn">
                    Dërgo Mesazhin
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
