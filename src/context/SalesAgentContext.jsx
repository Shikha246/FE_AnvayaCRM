// context/SalesAgentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SalesAgentContext = createContext();

export const SalesAgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("https://be-anvaya-crm.vercel.app/api/agents");
      setAgents(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAgent = async (agentData) => {
    try {
      const res = await axios.post("https://be-anvaya-crm.vercel.app/api/agents", agentData);
      
      // 🔥 Important: update state immediately
      setAgents((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <SalesAgentContext.Provider value={{ agents, fetchAgents, addAgent }}>
      {children}
    </SalesAgentContext.Provider>
  );
};

export const useSalesAgents = () => useContext(SalesAgentContext);