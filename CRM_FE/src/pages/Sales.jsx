import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LeadList from "../components/LeadList";
import LeadFilters from "../components/LeadFilters";
import { getLeads } from "../api/leadApi";

const SalesPage = () => {
  const [params] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const fetchLeads = async () => {
    try {
      setLoading(true);

      // Convert URL params → object
      const query = Object.fromEntries([...params]);

      const res = await getLeads(query);

      setLeads(res.data.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [params]);

  return (
    <div  className="text-center">

      <LeadFilters />

      <br />

      {loading ? <p>Loading...</p> : <LeadList leads={leads}/>}
    </div>
  );
};

export default SalesPage;