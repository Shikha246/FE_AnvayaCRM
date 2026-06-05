import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeadList = ({ leads }) => {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    switch (Number(priority)) {
      case 1:
        return <span className="badge bg-danger">High</span>;

      case 2:
        return (
          <span className="badge bg-warning text-dark">
            Medium
          </span>
        );

      default:
        return <span className="badge bg-success">Low</span>;
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
        return <span className="badge bg-success">Closed</span>;

      default:
        return <span className="badge bg-dark">Unknown</span>;
    }
  };

  return (
    <div
      style={{
        padding: "25px",
        width: "100%",
        boxSizing: "border-box",
      }}
      className="py-4"
    >
      {/* Heading */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">

        <div>
          <h2 className="fw-bold mb-1">
            Lead Management
          </h2>

          <p className="text-muted mb-0">
            Track and manage all your leads
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-3 py-2 align-self-start align-self-md-center">
          Total Leads: {leads.length}
        </span>
      </div>

      {/* Empty State */}
      {leads.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm">
          <h4 className="text-muted">No leads found</h4>

          <p className="text-secondary">
            Add new leads to start managing your CRM pipeline.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="col-12 col-md-6 col-lg-4"
            >
              <div
                className="card h-100 border-0 shadow-sm rounded-4 lead-card"
                onClick={() => navigate(`/leads/${lead._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              >
                <div className="card-body p-4">

                  {/* Top Section */}
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

                    {/* Left Side */}
                    <div className="text-start flex-grow-1 overflow-hidden">

                      {/* Lead Name */}
                      <h5
                        className="fw-bold text-dark mb-3"
                        style={{
                          wordBreak: "break-word",
                          lineHeight: "1.4",
                        }}
                      >
                        {lead.name}
                      </h5>

                      {/* Source */}
                      <div className="mb-3 info-row">
                        <span className="fw-semibold text-secondary">
                          Source:
                        </span>

                        <span className="text-break">
                          {lead.source}
                        </span>
                      </div>

                      {/* Agent */}
                      <div className="mb-3 info-row">
                        <span className="fw-semibold text-secondary">
                          Agent:
                        </span>

                        <span className="text-break">
                          {lead.salesAgent?.name ||
                            "Not Assigned"}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="mb-3 d-flex align-items-center gap-2 flex-wrap">

                        <span className="fw-semibold text-secondary">
                          Status:
                        </span>

                        {getStatusBadge(lead.status)}
                      </div>

                      {/* Tags */}
                      <div className="mb-2 tags-wrapper">

                        <span className="fw-semibold text-secondary me-2">
                          Tags:
                        </span>

                        <div className="d-flex flex-wrap gap-2 mt-2 mt-sm-0">

                          {lead.tags.length > 0 ? (
                            lead.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="badge rounded-pill bg-light text-dark border px-3 py-2"
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">
                              No Tags
                            </span>
                          )}

                        </div>
                      </div>

                    </div>

                    {/* Right Side Priority Badge */}
                    <div className="ms-1 flex-shrink-0">
                      {getPriorityBadge(lead.priority)}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-top pt-3 mt-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">

                    <div className="text-start">
                      <small className="text-muted d-block">
                        Time to Close
                      </small>

                      <div className="fw-bold text-primary">
                        {lead.timeToClose} days
                      </div>
                    </div>

                    <button className="btn btn-outline-primary rounded-pill px-3 py-2 btn-mobile">
                      View Details
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Styling */}
      <style>
        {`
          .lead-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.12) !important;
          }

          .info-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            line-height: 1.5;
          }

          .tags-wrapper {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
          }

          @media (max-width: 576px) {

            .py-4 {
              padding-top: 1rem !important;
              padding-bottom: 1rem !important;
            }

            .card-body {
              padding: 1.1rem !important;
            }

            .lead-card h5 {
              font-size: 1rem;
              line-height: 1.5;
            }

            .badge {
              font-size: 0.72rem !important;
            }

            .btn-mobile {
              width: 100%;
              margin-top: 0.5rem;
            }

            .tags-wrapper {
              flex-direction: column;
              gap: 0.5rem;
            }

            .info-row {
              flex-direction: column;
              gap: 2px;
            }

            .border-top {
              padding-top: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LeadList;