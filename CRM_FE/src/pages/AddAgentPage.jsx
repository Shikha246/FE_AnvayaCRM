import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSalesAgents } from "../context/SalesAgentContext";

const AddAgentPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { addAgent } = useSalesAgents();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await addAgent(form);

      setMessage("Agent created successfully ✅");

      setForm({
        name: "",
        email: "",
      });
    } catch (err) {
      setMessage("Error creating agent ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #eef4ff, #f8fbff)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            {/* Header */}
            <div
              className="text-center text-white py-3"
              style={{
                background: "linear-gradient(to right, #2563eb, #1e40af)",
              }}
            >
              <h3 className="fw-bold mb-1">Add Sales Agent</h3>

              <p
                className="mb-0 opacity-75"
                style={{ fontSize: "0.9rem" }}
              >
                Create and manage your CRM team
              </p>
            </div>

            {/* Form */}
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Agent Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter agent name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    style={{ fontSize: "0.95rem", padding: "10px" }}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    style={{ fontSize: "0.95rem", padding: "10px" }}
                    required
                  />
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`alert ${
                      message.includes("successfully")
                        ? "alert-success"
                        : "alert-danger"
                    } rounded-3 py-2`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {message}
                  </div>
                )}

                {/* Button */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 fw-semibold py-2"
                    style={{ fontSize: "0.95rem" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      "Create Agent"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "0.85rem" }}
          >
            Anvaya CRM • Sales Agent Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddAgentPage;