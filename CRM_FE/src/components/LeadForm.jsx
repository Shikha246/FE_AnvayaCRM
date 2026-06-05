

import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const LeadForm = () => {
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
const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(
          "https://be-anvaya-crm.vercel.app/api/agents"
        );

        setAgents(res.data.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const sources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];

  const statuses = [
    "new",
    "contacted",
    "qualified",
    "proposalSent",
    "closed",
  ];

  const priorities = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];

  const tagsList = ["High Value", "Follow-up"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (tag) => {
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];

    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        timeToClose: Number(formData.timeToClose),
        priority: Number(formData.priority),
      };

      const res = await axios.post(
        "https://be-anvaya-crm.vercel.app/api/leads",
        formattedData
      );

      console.log("Lead saved:", res.data);

      setShowToast(true);
setTimeout(() => {
  setShowToast(false);
}, 3000);
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
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0ecff, #f8fbff)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div
            className="card border-0 shadow-lg rounded-4"
            style={{ overflow: "hidden" }}
          >
            {/* Header */}
            <div
              className="text-white text-center py-4"
              style={{
                background: "linear-gradient(to right, #2563eb, #1e40af)",
              }}
            >
              <h2 className="fw-bold mb-1">Create New Lead</h2>
              <p className="mb-0 opacity-75">
                Add and manage your CRM leads easily
              </p>
            </div>

            {/* Form Body */}
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                {/* Lead Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Lead Name
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    name="name"
                    placeholder="Enter lead name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Source */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Lead Source
                  </label>

                  <select
                    className="form-select form-select-lg rounded-3"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="">Select Source</option>

                    {sources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sales Agent */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Assign Sales Agent
                  </label>

                  <select
                    className="form-select form-select-lg rounded-3"
                    name="salesAgent"
                    value={formData.salesAgent}
                    onChange={handleChange}
                  >
                    <option value="">Select Agent</option>

                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Lead Status
                  </label>

                  <select
                    className="form-select form-select-lg rounded-3"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="form-label fw-semibold d-block">
                    Tags
                  </label>

                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {tagsList.map((tag) => (
                      <div
                        key={tag}
                        className="form-check border rounded-pill px-3 py-2 bg-light"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.tags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                          id={tag}
                        />

                        <label
                          className="form-check-label ms-2"
                          htmlFor={tag}
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time To Close */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Time To Close (Days)
                  </label>

                  <input
                    type="number"
                    className="form-control form-control-lg rounded-3"
                    name="timeToClose"
                    placeholder="Enter number of days"
                    value={formData.timeToClose}
                    onChange={handleChange}
                  />
                </div>

                {/* Priority */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Priority
                  </label>

                  <select
                    className="form-select form-select-lg rounded-3"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    {priorities.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-3 fw-semibold py-3"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    {showToast && (
  <div
    className="toast show position-fixed bottom-0 end-0 m-4 border-0 shadow-lg"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style={{
      zIndex: 9999,
      minWidth: "300px",
      borderRadius: "14px",
      overflow: "hidden",
    }}
  >
    <div
      className="toast-header bg-success text-white border-0"
    >
      <strong className="me-auto">
        Success
      </strong>

      <button
        type="button"
        className="btn-close btn-close-white"
        onClick={() => setShowToast(false)}
      ></button>
    </div>

    <div className="toast-body bg-white">
      Lead Added successfully ✅
    </div>
  </div>
)}
    </div>
  );
};

export default LeadForm;