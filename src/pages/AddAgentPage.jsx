import { useState } from "react";
import axios from "axios";
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      // const res = await axios.post(
      //   "http://localhost:5000/api/agents",
      //   form
      // );
 // 🔥 Use context instead of axios
      await addAgent(form);
      setMessage("Agent created successfully ✅");

      // reset form
    setForm({ name: "", email: "" });
    } catch (err) {
      setMessage("Error creating agent ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Sales Agent</h2>

      <input
        type="text"
        name="name"
        placeholder="Agent Name"
        value={form.name}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Agent"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAgentPage;