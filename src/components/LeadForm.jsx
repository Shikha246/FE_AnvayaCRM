import { useState,useEffect } from "react";
import axios from "axios";

const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "new",
    tags: [],
    timeToClose: "",
    priority: 2,
  });
const [agents, setAgents] = useState([]);

useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("https://be-anvaya-crm.vercel.app/api/agents");
        setAgents(res.data.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const sources = ["Website", "Referral", "Cold Call","Advertisement","Email","Other"];
  const statuses = ["new", "contacted", "qualified", "proposalSent", "closed"];
  const priorities = [
  { label: "High", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Low", value: 3 },
];
  const tagsList = ["High Value", "Follow-up"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (tag) => {
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];

    setFormData({ ...formData, tags: updatedTags });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formattedData = {
      ...formData,
      timeToClose: Number(formData.timeToClose),
       priority: Number(formData.priority),
    };
console.log("sending Data:", formattedData);
    const res = await axios.post(
      "https://be-anvaya-crm.vercel.app/api/leads",
      formattedData
    );

    console.log("Lead saved:", res.data);

    alert("Lead created successfully!");

    // optional: reset form
    setFormData({
      name: "",
      source: "",
      salesAgent: "",
      status: "new",
      tags: [],
      timeToClose: "",
      priority: 2,
    });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  console.error("FULL ERROR:", error);
  console.error("RESPONSE:", error.response);
  console.error("DATA:", error.response?.data);

  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Lead</h2>
<br /><br />
<label htmlFor="leadName">Lead Name:  </label>
      <input
      id="leadName"
      className="leadField"
        type="text"
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
<br /><br />
<label>Source:  </label>
      <select name="source" value={formData.source} onChange={handleChange}>
        <option value="">Select Source</option>
        {sources.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <br />
      <br />
<label>Assign Sales Agent:  </label>
      <select
  name="salesAgent"
  value={formData.salesAgent}
  onChange={handleChange}
>
  <option value="">Assign Sales Agent</option>

  {agents.map((agent) => (
    <option key={agent._id} value={agent._id}>
      {agent.name}
    </option>
  ))}
</select>
<br /><br />
<label>Status: </label>
      <select name="status" value={formData.status} onChange={handleChange}>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
<br />
<br />
      <div>
       <label>Tag: </label>
        {tagsList.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={formData.tags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <br /><br />
<label>Time to Close: </label>
      <input
        type="number"
        name="timeToClose"
        placeholder="Time to Close (days)"
        value={formData.timeToClose}
        onChange={handleChange}
      />
<br /><br />
<label>Priority: </label>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        {priorities.map((p) => (
           <option key={p.value} value={p.value}>
      {p.label}
    </option>
        ))}
      </select>
<br /><br />
      <button type="submit">Add Lead</button>
    </form>
  );
};

export default LeadForm;