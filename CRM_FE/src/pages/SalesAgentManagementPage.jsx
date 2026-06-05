import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesAgentManagementPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  // Fetch Agents
  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "https://be-anvaya-crm.vercel.app/api/agents"
      );

      setAgents(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching agents:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Delete Agent
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://be-anvaya-crm.vercel.app/api/agents/${id}`
      );

      setAgents(
        agents.filter((agent) => agent._id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting agent:",
        error
      );
    }
  };

  // Open Modal
  const handleEditClick = (agent) => {
    setSelectedAgent(agent);

    setEditForm({
      name: agent.name,
      email: agent.email,
    });

    setShowModal(true);
  };

  // Update Form
  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Save Changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://be-anvaya-crm.vercel.app/api/agents/${selectedAgent._id}`,
        {
          name: editForm.name,
          email: editForm.email,
        }
      );

      await fetchAgents();

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
    padding: "25px",
    width: "100%",
    boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-primary mb-1">
            Sales Agent Management
          </h2>

          <p className="text-muted mb-0">
            Manage your CRM sales team
          </p>
        </div>

        <button
          className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
          onClick={() =>
            navigate("/add/agents")
          }
        >
          + Add New Agent
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="row g-4">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={agent._id}
              >
                <div
                  className="card border-0 shadow-sm rounded-4 h-100 agent-card"
                  style={{
                    transition: "0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/agent-view/${agent._id}`
                    )
                  }
                >
                  <div className="card-body p-4">

                    {/* Agent Info */}
                    <div className="mb-4">
                      <h4 className="fw-bold text-dark mb-2">
                        {agent.name}
                      </h4>

                      <p className="text-muted mb-0">
                        📧 {agent.email}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-outline-warning rounded-3 flex-grow-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(agent);
                        }}
                      >
                        Edit
                      </button>

                      {/* Optional Delete Button */}
                      {/* 
                      <button
                        className="btn btn-outline-danger rounded-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(agent._id);
                        }}
                      >
                        Delete
                      </button> 
                      */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted">
                No agents found
              </h5>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">

              {/* Modal Header */}
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  Edit Sales Agent
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body px-4">

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Agent Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="form-control rounded-3"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="form-control rounded-3"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0">
                <button
                  className="btn btn-light rounded-3"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary rounded-3"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hover Effect */}
      <style>
        {`
          .agent-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 28px rgba(0,0,0,0.12) !important;
          }
        `}
      </style>
    </div>
  );
};

export default SalesAgentManagementPage;