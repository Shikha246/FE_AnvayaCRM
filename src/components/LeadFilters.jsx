import { useSearchParams } from "react-router-dom";
import { useSalesAgents } from "../context/SalesAgentContext";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="card border-0 shadow-sm rounded-4 mb-4">

      {/* Header */}
      <div
        className="card-header border-0 text-white rounded-top-4 py-3"
        style={{
          background:
            "linear-gradient(to right, #2563eb, #1e40af)",
        }}
      >
        <h4 className="mb-0 fw-bold text-start">
          Lead Filters
        </h4>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        <div className="d-flex flex-wrap gap-3 align-items-end">

          {/* Status */}
          <div
            className="text-start"
            style={{ minWidth: "180px" }}
          >
            <label className="form-label fw-semibold small">
              Status
            </label>

            <select
              className="form-select rounded-3 text-start"
              onChange={(e) =>
                handleFilterChange(
                  "status",
                  e.target.value
                )
              }
            >
              <option value="">
                All Status
              </option>

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

          {/* Source */}
          <div
            className="text-start"
            style={{ minWidth: "180px" }}
          >
            <label className="form-label fw-semibold small">
              Source
            </label>

            <select
              className="form-select rounded-3 text-start"
              onChange={(e) =>
                handleFilterChange(
                  "source",
                  e.target.value
                )
              }
            >
              <option value="">
                All Sources
              </option>

              <option value="Website">
                Website
              </option>

              <option value="Referral">
                Referral
              </option>

              <option value="Cold Call">
                Cold Call
              </option>

              <option value="Advertisement">
                Advertisement
              </option>

              <option value="Email">
                Email
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Agent */}
          <div
            className="text-start"
            style={{ minWidth: "200px" }}
          >
            <label className="form-label fw-semibold small">
              Sales Agent
            </label>

            <select
              className="form-select rounded-3 text-start"
              onChange={(e) =>
                handleFilterChange(
                  "salesAgent",
                  e.target.value
                )
              }
            >
              <option value="">
                All Agents
              </option>

              {agents.map((agent) => (
                <option
                  key={agent._id}
                  value={agent._id}
                >
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div
            className="text-start"
            style={{ minWidth: "180px" }}
          >
            <label className="form-label fw-semibold small">
              Tags
            </label>

            <select
              className="form-select rounded-3 text-start"
              onChange={(e) =>
                handleFilterChange(
                  "tags",
                  e.target.value
                )
              }
            >
              <option value="">
                All Tags
              </option>

              <option value="High Value">
                High Value
              </option>

              <option value="Follow-up">
                Follow-up
              </option>
            </select>
          </div>

          {/* Sorting */}
          <div
            className="text-start"
            style={{ minWidth: "200px" }}
          >
            <label className="form-label fw-semibold small">
              Sort By
            </label>

            <select
              className="form-select rounded-3 text-start"
              onChange={(e) =>
                handleFilterChange(
                  "sort",
                  e.target.value
                )
              }
            >
              <option value="">
                No Sorting
              </option>

              <option value="priority">
                Sort by Priority
              </option>

              <option value="time">
                Sort by Time
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Responsive Styling */}
      <style>
        {`
          @media (max-width: 768px) {
            .card-body {
              text-align: left !important;
            }

            .form-label {
              text-align: left !important;
              display: block;
            }

            .form-select {
              text-align: left !important;
            }

            .d-flex {
              justify-content: flex-start !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LeadFilters;