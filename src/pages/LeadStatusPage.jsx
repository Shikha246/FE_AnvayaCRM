import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const LeadStatusPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const location = useLocation();

const queryParams = new URLSearchParams(location.search);
const statusFromDashboard = queryParams.get("status");

  // ✅ API CALL HERE
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("https://be-anvaya-crm.vercel.app/api/leads"); 
        setLeads(res.data.data);
        setFilteredLeads(res.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, []);

  // ✅ Filtering + Sorting Logic
  // useEffect(() => {
  //   let updated = [...leads];

  //   if (selectedAgent) {
  //     updated = updated.filter(
  //       (lead) => lead.salesAgent === selectedAgent
  //     );
  //   }

  //   if (selectedPriority) {
  //     updated = updated.filter(
  //       (lead) => lead.priority === selectedPriority
  //     );
  //   }

  //   if (sortOrder === "asc") {
  //     updated.sort((a, b) => a.timeToClose - b.timeToClose);
  //   } else if (sortOrder === "desc") {
  //     updated.sort((a, b) => b.timeToClose - a.timeToClose);
  //   }

  //   setFilteredLeads(updated);
  // }, [selectedAgent, selectedPriority, sortOrder, leads]);

  useEffect(() => {
  let updated = [...leads];

  // ✅ Filter from Dashboard
  if (statusFromDashboard) {
    updated = updated.filter(
      (lead) => lead.status === statusFromDashboard
    );
  }

  if (selectedAgent) {
    updated = updated.filter(
      (lead) => lead.salesAgent?.name === selectedAgent
    );
  }

  if (selectedPriority) {
    updated = updated.filter(
      (lead) => lead.priority === selectedPriority
    );
  }

  if (sortOrder === "asc") {
    updated.sort((a, b) => a.timeToClose - b.timeToClose);
  } else if (sortOrder === "desc") {
    updated.sort((a, b) => b.timeToClose - a.timeToClose);
  }

  setFilteredLeads(updated);
}, [selectedAgent, selectedPriority, sortOrder, leads, statusFromDashboard]);

  // Group leads by status
  const groupedLeads = filteredLeads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {});

  // const uniqueAgents = [...new Set(leads.map((l) => l.salesAgent?.name))];
// const uniqueAgents = [
//   ...new Map(
//     leads.map((l) => [l.salesAgent?._id, l.salesAgent])
//   ).values()
// ];

const uniqueAgents = [
  ...new Set(
    leads
      .map((l) => l.salesAgent?.name) // ✅ safe
      .filter(Boolean) // ✅ removes undefined/null
  )
];

  return (
    <div className="text-center" style={{ padding: "20px" }}>
      <h2>Leads by Status</h2>

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e) => setSelectedAgent(e.target.value)}>
  <option value="">All Agents</option>
  {uniqueAgents.map((agent, idx) => (
  <option key={idx} value={agent}>
    {agent}
  </option>
))}
</select>

        <select onChange={(e) => setSelectedPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Time to Close</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Lead Groups */}
      {Object.keys(groupedLeads).length === 0 ? (
  <p style={{ color: "gray", fontStyle: "italic" }}>
  No leads found for selected filters
</p>
) : (
  Object.keys(groupedLeads).map((status) => (
    <div key={status} style={{ marginBottom: "25px" }}>
      <h3>Status: {status}</h3>
      <ul>
        {groupedLeads[status].map((lead) => (
          <li key={lead._id}>
            <strong>{lead.name}</strong> - 
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              [Sales Agent: {lead.salesAgent?.name || "No Agent"}]
            </span> - 
            [Priority:
  {lead.priority === 1
    ? "High"
    : lead.priority === 2
    ? "Medium"
    : "Low"}] - 
            [Time: {lead.timeToClose}]
          </li>
        ))}
      </ul>
    </div>
  ))
)}
    </div>
  );
};

export default LeadStatusPage;