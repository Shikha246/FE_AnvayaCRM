import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [leadStats, setLeadStats] = useState({
    new: 0,
    contacted: 0,
    qualified: 0,
    proposalSent: 0,
    closed: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeadStats();
  }, []);

  const fetchLeadStats = async () => {
    try {
      const res = await fetch("https://be-anvaya-crm.vercel.app/api/leads/stats");
      const data = await res.json();

      setLeadStats({
        new: data.new || 0,
        contacted: data.contacted || 0,
        qualified: data.qualified || 0,
        proposalSent: data.proposalSent || 0,
        closed: data.closed || 0,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching lead stats:", error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Cards Wrapper */}
          <div style={styles.grid}>
            {/* Lead Status */}
            <div style={styles.card}>
              <h3>Lead Status</h3>
              <p>New: <strong>{leadStats.new}</strong></p>
              <p>Contacted: <strong>{leadStats.contacted}</strong></p>
              <p>Qualified: <strong>{leadStats.qualified}</strong></p>
              <p>Proposal Sent: <strong>{leadStats.proposalSent}</strong></p>
              <p>Closed: <strong>{leadStats.closed}</strong></p>
            </div>

            {/* Quick Filters */}
            <div style={styles.card}>
              <h3>Quick Filters</h3>

              <div style={styles.buttonGroup}>
                {["new", "contacted", "qualified", "proposalSent", "closed"].map(
                  (status) => (
                    <button
                      key={status}
                      style={styles.button}
                      onClick={() =>
                        navigate(`/leads/status?status=${status}`)
                      }
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Add Lead */}
          <button
            style={styles.addButton}
            onClick={() => navigate("/leads/new")}
          >
            + Add New Lead
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },

  heading: {
    fontSize: "clamp(20px, 3vw, 28px)", // responsive font
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },

  button: {
    padding: "8px 12px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    flex: "1 1 auto",
    minWidth: "120px",
  },

  addButton: {
    marginTop: "20px",
    padding: "12px 16px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "250px",
  },
};

export default DashboardPage;