import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeadList = ({ leads }) => {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    switch (Number(priority)) {
      case 1:
        return <span className="badge bg-danger">High</span>;
      case 2:
        return <span className="badge bg-warning text-dark">Medium</span>;
      default:
        return <span className="badge bg-success">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <span className="badge bg-primary">New</span>;

      case "contacted":
        return <span className="badge bg-info text-dark">Contacted</span>;

      case "qualified":
        return <span className="badge bg-warning text-dark">Qualified</span>;

      case "proposalSent":
        return <span className="badge bg-secondary">Proposal Sent</span>;

      case "closed":
        return <span className="badge bg-success">Closed</span>;

      default:
        return <span className="badge bg-dark">Unknown</span>;
    }
  };

  return (
    <div className="container py-4">
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Lead Management</h2>

          <p className="text-muted mb-0">
            Track and manage all your leads
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
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
                  
                  {/* Lead Name */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-bold text-dark mb-0">
                      {lead.name}
                    </h4>

                    {getPriorityBadge(lead.priority)}
                  </div>

                  {/* Source */}
                  <div className="mb-2">
                    <span className="fw-semibold text-secondary">
                      Source:
                    </span>{" "}
                    {lead.source}
                  </div>

                  {/* Agent */}
                  <div className="mb-2">
                    <span className="fw-semibold text-secondary">
                      Agent:
                    </span>{" "}
                    {lead.salesAgent?.name || "Not Assigned"}
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <span className="fw-semibold text-secondary me-2">
                      Status:
                    </span>

                    {getStatusBadge(lead.status)}
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <span className="fw-semibold text-secondary d-block mb-2">
                      Tags:
                    </span>

                    {lead.tags.length > 0 ? (
                      <div className="d-flex flex-wrap gap-2">
                        {lead.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge rounded-pill bg-light text-dark border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">No Tags</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        Time to Close
                      </small>

                      <div className="fw-bold text-primary">
                        {lead.timeToClose} days
                      </div>
                    </div>

                    <button className="btn btn-outline-primary btn-sm rounded-pill">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Hover Effect */}
      <style>
        {`
          .lead-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.12) !important;
          }
        `}
      </style>
    </div>
  );
};

export default LeadList;