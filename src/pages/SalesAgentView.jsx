import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesAgentView = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [agentName, setAgentName] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(
          `https://be-anvaya-crm.vercel.app/api/leads?salesAgent=${id}`
        );

        const data = res.data.data || [];

        setLeads(data);
        setFilteredLeads(data);

        if (data.length > 0 && data[0].salesAgent?.name) {
          setAgentName(data[0].salesAgent.name);
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, [id]);

  useEffect(() => {
    let updated = [...leads];

    if (statusFilter) {
      updated = updated.filter(
        (lead) => lead.status === statusFilter
      );
    }

    if (priorityFilter) {
      updated = updated.filter(
        (lead) =>
          Number(lead.priority) === Number(priorityFilter)
      );
    }

    if (sortBy === "timeToClose") {
      updated.sort(
        (a, b) =>
          Number(a.timeToClose) -
          Number(b.timeToClose)
      );
    }

    setFilteredLeads(updated);
  }, [statusFilter, priorityFilter, sortBy, leads]);

  const getPriorityBadge = (priority) => {
    switch (Number(priority)) {
      case 1:
        return (
          <span className="badge bg-danger px-3 py-2">
            High
          </span>
        );

      case 2:
        return (
          <span className="badge bg-warning text-dark px-3 py-2">
            Medium
          </span>
        );

      default:
        return (
          <span className="badge bg-success px-3 py-2">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <span className="badge bg-primary">New</span>;

      case "contacted":
        return (
          <span className="badge bg-info text-dark">
            Contacted
          </span>
        );

      case "qualified":
        return (
          <span className="badge bg-warning text-dark">
            Qualified
          </span>
        );

      case "proposalSent":
        return (
          <span className="badge bg-secondary">
            Proposal Sent
          </span>
        );

      case "closed":
        return (
          <span className="badge bg-success">
            Closed
          </span>
        );

      default:
        return (
          <span className="badge bg-dark">
            Unknown
          </span>
        );
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #eef4ff, #f8fbff)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="mb-5">
          <h2 className="fw-bold mb-2">
            Leads by Sales Agent
          </h2>

          <div
            className="card border-0 shadow-sm rounded-4 p-4"
            style={{
              background:
                "linear-gradient(to right, #2563eb, #1e40af)",
            }}
          >
            <h4 className="text-white mb-1">
              {agentName || "Loading..."}
            </h4>

            <p className="text-white-50 mb-0">
              Total Leads: {filteredLeads.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap gap-3">

              {/* Status Filter */}
              <div style={{ minWidth: "200px" }}>
                <label className="form-label fw-semibold small">
                  Status
                </label>

                <select
                  className="form-select rounded-3"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">
                    Contacted
                  </option>
                  <option value="qualified">
                    Qualified
                  </option>
                  <option value="proposalSent">
                    Proposal Sent
                  </option>
                  <option value="closed">
                    Closed
                  </option>
                </select>
              </div>

              {/* Priority Filter */}
              <div style={{ minWidth: "200px" }}>
                <label className="form-label fw-semibold small">
                  Priority
                </label>

                <select
                  className="form-select rounded-3"
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                >
                  <option value="">
                    All Priorities
                  </option>

                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </select>
              </div>

              {/* Sorting */}
              <div style={{ minWidth: "220px" }}>
                <label className="form-label fw-semibold small">
                  Sort By
                </label>

                <select
                  className="form-select rounded-3"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                >
                  <option value="">
                    No Sorting
                  </option>

                  <option value="timeToClose">
                    Time to Close
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Leads */}
        {filteredLeads.length > 0 ? (
          <div className="row g-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="col-12 col-md-6 col-lg-4"
              >
                <div
                  className="card border-0 shadow-sm rounded-4 h-100 lead-card"
                  style={{
                    transition: "0.3s ease",
                  }}
                >
                  <div className="card-body p-4">

                    {/* Name + Priority */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="fw-bold mb-0">
                        {lead.name}
                      </h4>

                      {getPriorityBadge(
                        lead.priority
                      )}
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <span className="fw-semibold text-secondary me-2">
                        Status:
                      </span>

                      {getStatusBadge(lead.status)}
                    </div>

                    {/* Time */}
                    <div className="mb-3">
                      <span className="fw-semibold text-secondary">
                        Time to Close:
                      </span>

                      <div className="fs-5 fw-bold text-primary mt-1">
                        {lead.timeToClose} days
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-top pt-3 mt-3">
                      <small className="text-muted">
                        CRM Lead Tracking
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white shadow-sm rounded-4 p-5">
            <h4 className="text-muted">
              No leads found
            </h4>

            <p className="text-secondary mb-0">
              This sales agent currently has no
              matching leads.
            </p>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .lead-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 28px rgba(0,0,0,0.12) !important;
          }
        `}
      </style>
    </div>
  );
};

export default SalesAgentView;