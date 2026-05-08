import { useSearchParams } from "react-router-dom";
import { useSalesAgents } from "../context/SalesAgentContext";
const LeadFilters = () => {
  const [params, setParams] = useSearchParams();
  const { agents } = useSalesAgents();

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(params);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setParams(newParams);
  };

  return (
    <div>
      <h3>Filters</h3>

      <select className="mx-2" onChange={(e) => handleFilterChange("status", e.target.value)}>
        <option value="">All Status</option>
        <option>new</option>
        <option>contacted</option>
        <option>qualified</option>
        <option>proposalSent</option>
        <option>closed</option>
      </select>

      <select className="mx-2" onChange={(e) => handleFilterChange("source", e.target.value)}>
        <option value="">All Sources</option>
        <option>Website</option>
        <option>Referral</option>
        <option>Cold Call</option>
        <option>Advertisement</option>
        <option>Email</option>
        <option>Other</option>
      </select>


      {/* <select onChange={(e) => handleFilterChange("agent", e.target.value)}>
  <option value="">All Agents</option>
  <option>John</option>
  <option>Jane</option>
</select> */}

<select className="mx-2" onChange={(e) => handleFilterChange("salesAgent", e.target.value)}>
  <option value="">All Agents</option>
      {agents.map((agent) => (
        <option key={agent._id} value={agent._id}>
          {agent.name}
        </option>
      ))}
    </select>

<select className="mx-2" onChange={(e) => handleFilterChange("tags", e.target.value)}>
  <option value="">All Tags</option>
  <option>High Value</option>
  <option>Follow-up</option>
</select>

<select className="mx-2" onChange={(e) => handleFilterChange("sort", e.target.value)}>
  <option value="">No Sorting</option>
  <option value="priority">Sort by Priority</option>
  <option value="time">Sort by Time</option>
</select>
    </div>

  );
};

export default LeadFilters;