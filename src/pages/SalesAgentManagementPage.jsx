import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SalesAgentView from "./SalesAgentView";
const SalesAgentManagementPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
const navigate = useNavigate();




const fetchAgents = async () => {
      try {
        const response = await axios.get("https://be-anvaya-crm.vercel.app/api/agents"); // adjust your endpoint
        setAgents(response.data.data);
        console.log(response.data);

      } catch (error) {
  console.error("Error fetching agents:", error.response?.data || error.message);
}
       finally {
        setLoading(false);
      }
    };

useEffect(() => {
    fetchAgents();
   
  }, []);



const handleDelete = async (id) => {
  try {
    await axios.delete(`https://be-anvaya-crm.vercel.app/api/agents/${id}`);
    setAgents(agents.filter((agent) => agent._id !== id));
  } catch (error) {
    console.error("Error deleting agent:", error);
  }
};



const handleEdit = async (salesagentinfo) => {
  console.log("Edit clicked:",salesagentinfo);
  const agent = agents.find((a) => a._id === salesagentinfo._id);

  if (!agent) return;

  const newName = prompt("Enter new name", agent.name);
  const newEmail = prompt("Enter new email", agent.email);

  try {
    await axios.put(`https://be-anvaya-crm.vercel.app/api/agents/${agent._id}`, {
      name: newName,
      email: newEmail,
    });
    await fetchAgents(); // 🔥 re-fetch latest data
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="container py-5 text-center">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Sales Agent Management</h2>
        <button className="btn btn-primary shadow-sm" onClick={() => navigate("/add/agents")}>
          + Add New Agent
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="row">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div onClick={() => {
  console.log("Clicked agent ID:", agent._id);
  navigate(`/agent-view/${agent._id}`);
}} className="col-md-3 mb-4" key={agent._id}>
                <div className="card border-0 shadow-lg h-100 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold text-dark">
                      {agent.name}
                    </h5>
                    <p className="text-muted mb-2">
                      📧 {agent.email}
                    </p>

                    {/* <span className="badge bg-success-subtle text-success">
                      Active
                    </span> */}
{/* This will come in next div if you want delete button also:d-flex justify-content-between */}
                    <div className="mt-3">
                      {/* <button className="btn btn-outline-primary btn-sm">
                        View
                      </button> */}
                      <button className="btn btn-outline-warning btn-lg" onClick={() => handleEdit(agent)}>
                        Edit
                      </button>
                      {/* <button className="btn btn-outline-danger btn-lg" onClick={() => handleDelete(agent._id)}>
                        Delete
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No agents found.</p>
          )}
        </div>
      )}



    </div>
    
  );
};
export default SalesAgentManagementPage;