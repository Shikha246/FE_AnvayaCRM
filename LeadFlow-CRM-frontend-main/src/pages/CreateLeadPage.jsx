import axios from "axios";
import LeadForm from "../components/LeadForm";

const CreateLeadPage = () => {
  const handleCreate = async (data) => {
    try{
      const res = await axios.post("https://be-anvaya-crm.vercel.app/api/leads", // backend URL
        data);
        console.log("Lead Saved:",res.data);
        alert("Lead created successfully");
    }catch(error){
      console.error("Error creating lead:",error.response?.data || error.message);
    }
  
  };

  return (
    <div className="text-center">
      <LeadForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateLeadPage;