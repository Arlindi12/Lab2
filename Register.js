import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Email i pavlefshëm';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Fjalëkalimi duhet të jetë së paku 6 karaktere';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Emri është i detyrueshëm';
    }
    return newErrors;
  };

  const handleSignUp = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      FullName: formData.fullName,
      Email: formData.email,
      Phone: formData.phone,
      Password: formData.password,
      RoleId: 2, // Roli default
    };

    axios
      .post('https://localhost:7254/api/Account/Registration', data)
      .then(() => {
        alert(`Mirësevini, ${formData.fullName}!`);
        navigate('/Login');
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data?.message || 'Ndodhi një gabim');
        } else {
          alert('Gabim në rrjet, provoni më vonë.');
        }
      });
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff' }}>
      <div className="card text-black shadow-sm" style={{ borderRadius: '25px', width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-5">Regjistrohu</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="fullName" className="form-label">
                Emri i plotë
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Shkruani emrin tuaj"
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Shkruani email-in"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                Telefoni
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Shkruani numrin e telefonit"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Fjalëkalimi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Shkruani fjalëkalimin"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSignUp}
              >
                Regjistrohu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
