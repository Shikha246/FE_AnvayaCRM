import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Users,
  FileText,
  AlertTriangle,
} from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";

const SettingsPage = () => {
  const [agents, setAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [agentsRes, leadsRes] = await Promise.all([
        axios.get("https://be-anvaya-crm.vercel.app/api/agents"),
        axios.get("https://be-anvaya-crm.vercel.app/api/leads"),
      ]);

      setAgents(agentsRes.data.data || []);
      setLeads(leadsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching settings data", error);

      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // OPEN DELETE MODAL
  const openDeleteModal = (type, id) => {
    setDeleteType(type);
    setSelectedId(id);
    setShowModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      // DELETE AGENT
      if (deleteType === "agent") {
        await axios.put(
          `https://be-anvaya-crm.vercel.app/api/leads/unassign/${selectedId}`
        );

        await axios.delete(
          `https://be-anvaya-crm.vercel.app/api/agents/${selectedId}`
        );

        toast.success("Agent deleted successfully");
      }

      // DELETE LEAD
      if (deleteType === "lead") {
        await axios.delete(
          `https://be-anvaya-crm.vercel.app/api/leads/${selectedId}`
        );

        toast.success("Lead deleted successfully");
      }

      fetchData();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    } finally {
      setShowModal(false);
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="bg-dark text-white rounded-4 p-4 shadow mb-4">
        <h1 className="fw-bold mb-2">CRM Settings</h1>

        <p className="mb-0 text-light">
          Manage agents, leads, and system cleanup.
        </p>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary text-white rounded-circle p-3">
                <Users size={28} />
              </div>

              <div>
                <h5 className="fw-bold mb-1">Total Agents</h5>

                <h2 className="mb-0">{agents.length}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success text-white rounded-circle p-3">
                <FileText size={28} />
              </div>

              <div>
                <h5 className="fw-bold mb-1">Total Leads</h5>

                <h2 className="mb-0">{leads.length}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AGENTS SECTION */}
      <div className="card border-0 shadow rounded-4 mb-5">
        <div className="card-header bg-white border-0 p-4 d-flex align-items-center gap-2">
          <Users className="text-primary" />

          <h4 className="fw-bold mb-0">Manage Agents</h4>
        </div>

        <div className="card-body p-4">
          {agents.length === 0 ? (
            <div className="alert alert-warning rounded-4">
              No agents available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent._id}>
                      <td className="fw-semibold">{agent.name}</td>

                      <td>{agent.email}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger rounded-pill px-3"
                          onClick={() =>
                            openDeleteModal("agent", agent._id)
                          }
                        >
                          <Trash2 size={16} className="me-2" />

                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* LEADS SECTION */}
      <div className="card border-0 shadow rounded-4">
        <div className="card-header bg-white border-0 p-4 d-flex align-items-center gap-2">
          <AlertTriangle className="text-danger" />

          <h4 className="fw-bold mb-0">
            Danger Zone - Delete Leads
          </h4>
        </div>

        <div className="card-body p-4">
          {leads.length === 0 ? (
            <div className="alert alert-info rounded-4">
              No leads available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Status</th>
                    <th>Assigned Agent</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td className="fw-semibold">{lead.name}</td>

                      <td>
                        <span className="badge bg-primary-subtle text-dark px-3 py-2 rounded-pill">
                          {lead.status}
                        </span>
                      </td>

                      <td>
                        {lead.salesAgent?.name || (
                          <span className="text-danger fw-semibold">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-danger rounded-pill px-3"
                          onClick={() =>
                            openDeleteModal("lead", lead._id)
                          }
                        >
                          <Trash2 size={16} className="me-2" />

                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger">
                  Confirm Delete
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-0">
                  {deleteType === "agent"
                    ? "Deleting this agent will make assigned leads Unassigned."
                    : "Are you sure you want to permanently delete this lead?"}
                </p>
              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-light rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger rounded-pill px-4"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;