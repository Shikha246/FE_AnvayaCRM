import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LeadStatusPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const statusFromDashboard = queryParams.get("status");

  // ✅ Fetch Leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(
          "https://be-anvaya-crm.vercel.app/api/leads"
        );

        setLeads(res.data.data);
        setFilteredLeads(res.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, []);

  // ✅ Filter + Sort
  useEffect(() => {
    let updated = [...leads];

    // Filter by status from dashboard
    if (statusFromDashboard) {
      updated = updated.filter(
        (lead) => lead.status === statusFromDashboard
      );
    }

    // Filter by agent
    if (selectedAgent) {
      updated = updated.filter(
        (lead) => lead.salesAgent?.name === selectedAgent
      );
    }

    // Filter by priority
    if (selectedPriority) {
      updated = updated.filter(
        (lead) => String(lead.priority) === selectedPriority
      );
    }

    // Sort by time
    if (sortOrder === "asc") {
      updated.sort((a, b) => a.timeToClose - b.timeToClose);
    } else if (sortOrder === "desc") {
      updated.sort((a, b) => b.timeToClose - a.timeToClose);
    }

    setFilteredLeads(updated);
  }, [
    selectedAgent,
    selectedPriority,
    sortOrder,
    leads,
    statusFromDashboard,
  ]);

  // ✅ Group Leads by Status
  const groupedLeads = filteredLeads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }

    acc[lead.status].push(lead);
    return acc;
  }, {});

  // ✅ Unique Agents
  const uniqueAgents = [
    ...new Set(
      leads
        .map((l) => l.salesAgent?.name)
        .filter(Boolean)
    ),
  ];

  // ✅ Priority Badge Color
  const getPriorityBadge = (priority) => {
    if (priority === 1) {
      return (
        <span className="badge bg-danger">
          High
        </span>
      );
    }

    if (priority === 2) {
      return (
        <span className="badge bg-warning text-dark">
          Medium
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        Low
      </span>
    );
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          Leads by Status
        </h2>
        <p className="text-muted">
          Manage and track all leads efficiently
        </p>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            
            {/* Agent Filter */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Sales Agent
              </label>

              <select
                className="form-select"
                onChange={(e) =>
                  setSelectedAgent(e.target.value)
                }
              >
                <option value="">All Agents</option>

                {uniqueAgents.map((agent, idx) => (
                  <option key={idx} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Priority
              </label>

              <select
                className="form-select"
                onChange={(e) =>
                  setSelectedPriority(e.target.value)
                }
              >
                <option value="">All Priority</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>

            {/* Sort */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Sort by Time
              </label>

              <select
                className="form-select"
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
              >
                <option value="">
                  Sort by Time to Close
                </option>
                <option value="asc">
                  Ascending
                </option>
                <option value="desc">
                  Descending
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* No Leads */}
      {Object.keys(groupedLeads).length === 0 ? (
        <div className="alert alert-secondary text-center">
          No leads found for selected filters
        </div>
      ) : (
        Object.keys(groupedLeads).map((status) => (
          <div key={status} className="mb-5">
            
            {/* Status Heading */}
            <div className="d-flex align-items-center mb-3">
              <h4 className="text-capitalize fw-bold text-dark">
                {status}
              </h4>

              <span className="badge bg-primary ms-2">
                {groupedLeads[status].length}
              </span>
            </div>

            {/* Lead Cards */}
            <div className="row">
              {groupedLeads[status].map((lead) => (
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={lead._id}
                >
                  <div className="card h-100 shadow-sm border-0 rounded-4">
                    <div className="card-body">
                      
                      {/* Lead Name */}
                      <h5 className="card-title fw-bold text-primary">
                        {lead.name}
                      </h5>

                      <hr />

                      {/* Sales Agent */}
                      <p className="mb-2">
                        <strong>Sales Agent:</strong>{" "}
                        {lead.salesAgent?.name || "No Agent"}
                      </p>

                      {/* Priority */}
                      <p className="mb-2">
                        <strong>Priority:</strong>{" "}
                        {getPriorityBadge(lead.priority)}
                      </p>

                      {/* Time */}
                      <p className="mb-0">
                        <strong>Time to Close:</strong>{" "}
                        {lead.timeToClose} days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LeadStatusPage;