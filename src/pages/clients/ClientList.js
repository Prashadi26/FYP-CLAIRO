import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./ClientList.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faSearch,
  faExclamationTriangle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlus } from "react-icons/fa";

import { Pencil, Trash2 } from "lucide-react";

const ClientList = ({ userInfo }) => {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch clients from Supabase on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  
  const fetchClients = async () => {
    try {
      setLoading(true);

      // Fetch clients linked to this lawyer
      const { data } = await supabase.from("clients").select("*");

      setClients(data);
      setTotalClients(data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId) => {
    if (window.confirm(t("confirm_delete_client"))) {
      try {
        setLoading(true);

        //  Check if the client is associated with any cases
        const { data: associatedCases } = await supabase
          .from("client_case")
          .select("case_id")
          .eq("client_id", clientId);

        // If there are associated cases, fetch their details
        if (associatedCases && associatedCases.length > 0) {
          //  Retrieve case numbers from the cases table
          const caseIds = associatedCases.map((c) => c.case_id);
          const { data: caseDetails, error: detailsError } = await supabase
            .from("cases")
            .select("case_no")
            .in("case_id", caseIds);

          if (detailsError) throw detailsError;

          //  Create a message listing the associated case numbers
          const caseNumbers = caseDetails.map((c) => c.case_no).join(", ");
          alert(`${t("client_association_warning")}: ${caseNumbers}`);
          return; // Exit without deleting
        }

        //  Proceed with deletion since there are no associated cases
        const { error } = await supabase
          .from("clients")
          .delete()
          .eq("client_id", clientId);

        setClients(clients.filter((client) => client.client_id !== clientId));
        setTotalClients(totalClients - 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter clients based on search term
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.profession &&
        client.profession.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.clientListContainer}>
      <div className={styles.header}>
        <h2>
          <FontAwesomeIcon icon={faUserTie} className={styles.headerIcon} />
          {t("Client_List")}
        </h2>
        <button
          onClick={() => navigate("/clients/add")}
          className={styles.addButton}
        >
          <FontAwesomeIcon icon={FaPlus} className={styles.buttonIcon} />
          {t("Add")}
        </button>
      </div>

      {/* Total Clients Overview */}
      <div className={styles.totalClientsCard}>
        <div className={styles.cardContent}>
          <h3>{t("TotalClients")}</h3>
          <div className={styles.clientCount}>{totalClients}</div>
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <div className={`${styles.notification} ${styles.errorNotification}`}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className={styles.notificationIcon}
          />
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t("SearchClient")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>{t("loading")}</p>
        </div>
      ) : (
        <>
          {filteredClients.length > 0 ? (
            <div className={styles.tableCard}>
              <div className={styles.tableContainer}>
                <table className={styles.clientTable}>
                  <thead>
                    <tr>
                      <th>{t("ClientName")}</th>
                      <th>{t("ContactNo")}</th>
                      <th>{t("Email")}</th>
                      <th>{t("Profession")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.client_id}>
                        <td>
                          <div className={styles.nameCell}>
                            <div className={styles.avatar}>
                              {client.name?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <span>{client.name}</span>
                          </div>
                        </td>
                        <td>{client.contact_no}</td>
                        <td>{client.email}</td>
                        <td>{client.profession || "-"}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              onClick={() =>
                                navigate(`/clients/update/${client.client_id}`)
                              }
                              className={`${styles.actionButton} ${styles.editButton}`}
                              title={t("Update")}
                            >
                              <Pencil />
                            </button>
                            <button
                              onClick={() => handleDelete(client.client_id)}
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              title={t("Delete")}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.emptyStateCard}>
              <div className={styles.emptyState}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  className={styles.emptyIcon}
                />
                <p>
                  {searchTerm
                    ? t("No Clients Matching Search")
                    : t("No Clients Found")}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientList;
