import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [lead, setLead] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(
          `https://be-anvaya-crm.vercel.app/api/leads/${id}`
        );

        setLead(response.data.data);
        setComments(response.data.data.comments || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLead();
  }, [id]);

  // COMMENT FUNCTION
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `https://be-anvaya-crm.vercel.app/api/leads/${id}/comments`,
        {
          text: comment,
          author: "Admin",
        }
      );

      setComments(response.data.data);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (field, value) => {
    setLead({
      ...lead,
      [field]: value,
    });
  };

  // SAVE UPDATED LEAD
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://be-anvaya-crm.vercel.app/api/leads/${id}`,
        lead
      );

      setLead(response.data.data);

      setIsEditing(false);

      setShowToast(true);

setTimeout(() => {
  setShowToast(false);
}, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!lead) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Lead Management: {lead.name}</h2>
          </div>

          {/* LEAD DETAILS CARD */}
          <div
            className="card shadow-sm mb-4"
            style={{
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <div className="card-body">
              <h3 className="mb-4">Lead Details</h3>

              <div className="row">

                {/* NAME */}
                <div className="col-md-6 mb-3">
                  <strong>Lead Name:</strong>

                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control mt-2"
                      value={lead.name}
                      onChange={(e) =>
                        handleChange("name", e.target.value)
                      }
                    />
                  ) : (
                    <p>{lead.name}</p>
                  )}
                </div>

                {/* SALES AGENT */}
                <div className="col-md-6 mb-3">
                  <strong>Sales Agent:</strong>

                  <p>{lead.salesAgent?.name}</p>
                </div>

          
                {/* SOURCE */}
<div className="col-md-6 mb-3">
  <strong>Lead Source:</strong>

  {isEditing ? (
    <select
      className="form-select mt-2"
      value={lead.source}
      onChange={(e) =>
        handleChange("source", e.target.value)
      }
    >
      <option value="Website">Website</option>

      <option value="Email">
        Email
      </option>

      <option value="Advertisement">
        Advertisement
      </option>

      <option value="Referral">
        Referral
      </option>

      <option value="Cold Call">
        Cold Call
      </option>
      <option value="Others">
        Others
      </option>
    </select>
  ) : (
    <p>{lead.source}</p>
  )}
</div>

                {/* STATUS */}
                <div className="col-md-6 mb-3">
                  <strong>Lead Status:</strong>

                  {isEditing ? (
                    <select
                      className="form-select mt-2"
                      value={lead.status}
                      onChange={(e) =>
                        handleChange("status", e.target.value)
                      }
                    >
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
                  ) : (
                    <p>{lead.status}</p>
                  )}
                </div>

                {/* PRIORITY */}
                <div className="col-md-6 mb-3">
                  <strong>Priority:</strong>

                  {isEditing ? (
                    <select
                      className="form-select mt-2"
                      value={lead.priority}
                      onChange={(e) =>
                        handleChange("priority", e.target.value)
                      }
                    >
                      <option value="1">High</option>

                      <option value="2">Medium</option>

                      <option value="3">Low</option>
                    </select>
                  ) : (
                    <p>
                      {Number(lead.priority) === 1
                        ? "High"
                        : Number(lead.priority) === 2
                        ? "Medium"
                        : "Low"}
                    </p>
                  )}
                </div>

                {/* TIME TO CLOSE */}
                <div className="col-md-6 mb-3">
                  <strong>Time to Close:</strong>

                  {isEditing ? (
                    <input
                      type="number"
                      className="form-control mt-2"
                      value={lead.timeToClose}
                      onChange={(e) =>
                        handleChange(
                          "timeToClose",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{lead.timeToClose} Days</p>
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              {!isEditing ? (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Lead Details
                </button>
              ) : (
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* COMMENTS SECTION */}
          <div
            className="card shadow-sm"
            style={{
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <div className="card-body">
              <h3 className="mb-4">Comments Section</h3>

              {comments.length === 0 ? (
                <p>No comments yet</p>
              ) : (
                comments.map((c, i) => (
                  <div
                    key={i}
                    className="border rounded p-3 mb-3"
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{c.author}</strong>

                      <small>
                        {new Date(
                          c.createdAt
                        ).toLocaleString()}
                      </small>
                    </div>

                    <p className="mt-2 mb-0">{c.text}</p>
                  </div>
                ))
              )}

              {/* ADD COMMENT */}
              <div className="mt-4">
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add new comment..."
                />

                <button
                  className="btn btn-success"
                  onClick={handleAddComment}
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Bootstrap Toast */}
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
      Lead updated successfully ✅
    </div>
  </div>
)}
    </div>
  );
};

export default LeadDetails;