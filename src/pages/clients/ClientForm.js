import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUserPlus, FaArrowLeft, FaTimes, FaUser, FaPhone, FaEnvelope, FaBriefcase, FaCheck } from 'react-icons/fa';
import styles from './ClientForm.module.css'; 
const ClientForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    email: '',
    profession: ''
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      contactNo: '',
      email: '',
      profession: ''
    });
    setError(null);
    setSuccess(null);
  };

  // Go back to client list
  const handleBack = () => {
    navigate('/clients');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Enable loading state
    setError(null);

    try {
      // Insert data into Supabase for clients
      const { error: clientError } = await supabase.from('clients').insert([
        {
          name: formData.name,
          contact_no: formData.contactNo,
          email: formData.email,
          profession: formData.profession || null
        },
      ]);

      if (clientError) {
        throw new Error(clientError.message);
      }
      // Set success message
      setSuccess(t('ClientAddedSuccessfully', 'Client added successfully!'));
      // Reset form after successful submission
      resetForm();
      // Navigate back to ClientList after short delay
      setTimeout(() => {
        navigate('/clients');
      }, 800);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-header']}>
        <button 
          className={styles['back-button']} 
          onClick={handleBack}
          aria-label={t('Back')}
        >
          <FaArrowLeft />
        </button>
        <h2><FaUserPlus className={styles['header-icon']} /> {t('AddClientDetails', 'Add Client Details')}</h2>
      </div>

      {/* Notification area */}
      {error && (
        <div className={`${styles.notification} ${styles['error-notification']}`}>
          <FaTimes className={styles['notification-icon']} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className={`${styles.notification} ${styles['success-notification']}`}>
          <FaCheck className={styles['notification-icon']} />
          <span>{success}</span>
        </div>
      )}

      <div className={styles['card-container']}>
        <form onSubmit={handleSubmit} className={styles['form-card']}>
          <div className={`${styles['form-group']} ${focusedField === 'name' ? styles.focused : ''}`}>
            <label htmlFor="name">
              <FaUser className={styles['input-icon']} /> {t('Name', 'Name')}
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              placeholder={t('EnterName', 'Enter client name')}
              required 
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className={`${styles['form-group']} ${focusedField === 'contactNo' ? styles.focused : ''}`}>
            <label htmlFor="contactNo">
              <FaPhone className={styles['input-icon']} /> {t('ContactNo', 'Contact Number')}
            </label>
            <input 
              type="text" 
              id="contactNo"
              name="contactNo"
              value={formData.contactNo} 
              onChange={handleChange} 
              placeholder={"+94 XX XXX XXX"}
              required 
              onFocus={() => setFocusedField('contactNo')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className={`${styles['form-group']} ${focusedField === 'email' ? styles.focused : ''}`}>
            <label htmlFor="email">
              <FaEnvelope className={styles['input-icon']} /> {t('Email', 'Email')}
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              placeholder={t('EnterEmail', 'Enter email address')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className={`${styles['form-group']} ${focusedField === 'profession' ? styles.focused : ''}`}>
            <label htmlFor="profession">
              <FaBriefcase className={styles['input-icon']} /> {t('Profession', 'Profession')}
            </label>
            <input 
              type="text" 
              id="profession"
              name="profession"
              value={formData.profession} 
              onChange={handleChange} 
              placeholder={t('EnterProfession', 'Enter client profession (optional)')}
              onFocus={() => setFocusedField('profession')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className={styles['form-actions']}>
            <button 
              type="button" 
              className={styles['secondary-button']}
              onClick={resetForm}
            >
              {t('Reset', 'Reset')}
            </button>
            <button 
              type="submit" 
              className={styles['primary-button']}
              disabled={loading}
            >
              {loading ? t('Adding', 'Adding...') : t('Add', 'Add Client')}
              {loading && <span className={styles['button-spinner']}></span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;