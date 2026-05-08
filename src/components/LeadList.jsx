import { useNavigate } from "react-router-dom";
const LeadList = ({ leads}) => {
  const navigate = useNavigate();
  console.log("Leads:",leads);

  return (
    <div>
      <h2>Leads</h2>

      {leads.length === 0 && <p>No leads found</p>}
      
<div className="row">
      {leads.map((lead, index) => (
        
        <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 cardSize">
        <div className="card" onClick={() => navigate(`/leads/${lead._id}`)} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" ,borderRadius: "8px",
    background: "#fff"}}>
          <h3>{lead.name}</h3>
          <p>Source: {lead.source}</p>
          <p>Agent: {lead.salesAgent?.name}</p>

          <p>Status: {lead.status}</p>
          <p>Priority:
  {Number(lead.priority) === 1
    ? "High"
    : Number(lead.priority) === 2
    ? "Medium"
    : "Low"}
</p>
          <p>Tags: {lead.tags.join(", ")}</p>
          <p>Time to Close: {lead.timeToClose} days</p>
        </div></div>
      ))}
      </div>
    </div>
  );
};

export default LeadList;