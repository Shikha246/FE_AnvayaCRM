import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SalesAgentView = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [agentName, setAgentName] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { id } = useParams();
  console.log("URL param ID:", id);

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
      updated = updated.filter((lead) => lead.status === statusFilter);
    }

    if (priorityFilter) {
      updated = updated.filter((lead) => Number(lead.priority) === Number(priorityFilter));
    }

    if (sortBy === "timeToClose") {
  updated.sort(
    (a, b) => Number(a.timeToClose) - Number(b.timeToClose)
  );
}

    setFilteredLeads(updated);
  }, [statusFilter, priorityFilter, sortBy, leads]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leads by Sales Agent</h2>

      <h5 className="mb-4 text-primary">
        Sales Agent: {agentName || "Loading..."}
      </h5>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposalSent">Proposal Sent</option>
            <option value="closed">Closed</option>

          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Filter by Priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="timeToClose">Time to Close</option>
          </select>
        </div>
      </div>

      {/* Leads List with reduced width */}
      {filteredLeads.length > 0 ? (
        <div className="row">
          {filteredLeads.map((lead) => (
            <div key={lead._id} className="col-md-4 mx-auto">
              <div className="card mb-3 p-3 shadow-sm border-1">
                <h5 className="mb-2 text-center">{lead.name}</h5>

                <span className="badge bg-secondary me-2">
                  Status: {lead.status}
                </span>

                <span
                  className={`badge ${
                    Number(lead.priority) === 1
                      ? "bg-danger"
                      : Number(lead.priority) === 2
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  Priority:
  { Number(lead.priority) === 1
    ? "High"
    : Number(lead.priority) === 2
    ? "Medium"
    : "Low"}
                </span>
                <p className="mt-2">
  <strong>Time to Close:</strong> {lead.timeToClose} days
</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No leads found for this agent.</p>
      )}
    </div>
  );
};

export default SalesAgentView;