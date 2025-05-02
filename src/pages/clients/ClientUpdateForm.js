import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useTranslation } from "react-i18next";
import styles from "./ClientUpdateForm.module.css";

const ClientUpdateForm = () => {
  const { t } = useTranslation();
  const { clientId } = useParams(); // Get clientId from URL parameters
  const navigate = useNavigate(); // For navigation
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch client details when the component mounts
  useEffect(() => {
    fetchClientDetails();
  }, []);

  
  const fetchClientDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("client_id", clientId)
        .single(); 

      if (error) {
        throw new Error(error.message);
      } else {
        setName(data.name);
        setContactNo(data.contact_no);
        setEmail(data.email);
        setProfession(data.profession || "");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error } = await supabase
        .from("clients")
        .update({
          name,
          contact_no: contactNo,
          email,
          profession: profession || null,
        })
        .eq("client_id", clientId);

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(t("ClientUpdatedSuccessfully"));

      // Navigate back to client list after short delay
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>{t("UpdateClientDetails")}</h2>
      </div>

      {error && (
        <div className={`${styles.notification} ${styles.errorNotification}`}>
          {error}
        </div>
      )}

      {success && (
        <div className={`${styles.notification} ${styles.successNotification}`}>
          {success}
        </div>
      )}

      {loading && !success ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>{t("Loading")}</p>
        </div>
      ) : (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>{t("Name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.textInput}
                placeholder={t("EnterClientName")}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label>{t("ContactNo")}</label>
              <input
                type="text"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
                className={styles.textInput}
                placeholder={t("EnterContactNumber")}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label>{t("Email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.textInput}
                placeholder={t("EnterEmail")}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label>{t("Profession")}</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className={styles.textInput}
                placeholder={t("EnterProfession")}
                disabled={loading}
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.secondaryButton}
                disabled={loading}
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loading}
              >
                {loading ? t("Updating") : t("Update")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientUpdateForm;
