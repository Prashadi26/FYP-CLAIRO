import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import './AuthPages.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
    contactNo: '',
    languageCompetency: [],
    yearsOfExperience: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const languages = ['Tamil', 'English', 'Sinhala'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      languageCompetency: formData.languageCompetency.includes(value)
        ? formData.languageCompetency.filter((lang) => lang !== value)
        : [...formData.languageCompetency, value]
    });
  };
  
  const validateForm = () => {
    // Password validation
    if (formData.password.length < 6) {
      setError(t('password_too_short') || 'Password should be at least 6 characters');
      return false;
    }
    return true;
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      //  Sign up user with Supabase Auth first
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username
          }
        }
      });

      if (signUpError) throw signUpError;

      // Verify the user was created successfully
      if (!authData.user) {
        throw new Error(t('user_creation_failed'));
      }

      //  First create the attorney record to get the lawyer_id
      // Convert language array to comma-separated string
      const languageString = formData.languageCompetency.join(', ');

      // Insert attorney details
      const { data: attorneyData, error: attorneyError } = await supabase
        .from('attorney_at_law')
        .insert([{ 
          email: formData.email, 
          name: formData.name,
          contact_no: formData.contactNo,
          language_competency: languageString,
          years_of_experience: formData.yearsOfExperience
        }])
        .select();

      if (attorneyError) throw attorneyError;

      // Get the newly created attorney's ID
      const attorneyId = attorneyData[0].lawyer_id;

      //  Now insert user details into users table with the lawyer_id
      //  Insert user details with the lawyer_id we now have
      const { error: userInsertError } = await supabase
        .from('users')
        .insert([{
          email: formData.email,
          username: formData.username,
          lawyer_id: attorneyId
        }]);

      if (userInsertError) throw userInsertError;

      setSuccess(t('confirm'));
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
      
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || t('signup_error'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container signup-container">
        <div className="auth-form-container">
          <h1>{t('signup')}</h1>
         
          
          <form className="auth-form" onSubmit={handleSignUp}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('Name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('Email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">{t('username')}</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">{t('password')}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  required
                  minLength="6"
                />
                <small className="form-hint">{t('Password_must_be_at_least_6_characters')}</small>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactNo">{t('ContactNo')}</label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="yearsOfExperience">{t('Years_Of_Experience')}</label>
                <input
                  type="text"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>{t('Language_Competency')}</label>
              <div className="language-checkboxes">
                {languages.map((language) => (
                  <div key={language} className="checkbox-group">
                    <input
                      type="checkbox"
                      id={language}
                      value={language}
                      checked={formData.languageCompetency.includes(language)}
                      onChange={handleLanguageChange}
                    />
                    <label htmlFor={language}>{language}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? t('creating_account') : t('signup')}
              </button>
            </div>
            
            <div className="auth-links">
              <p className="signin-prompt">
                {t('already_have_account')}{' '}
                <Link to="/signin" className="signin-link">
                  {t('signin')}
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        <div className="auth-image">
          <div className="auth-quote">
            <h2>Clairo</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;