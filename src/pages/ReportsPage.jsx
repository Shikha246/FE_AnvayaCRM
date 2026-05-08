import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pie,
  Bar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ReportsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://be-anvaya-crm.vercel.app/api/reports");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading reports...</h2>;
  if (!data) return <h2 style={{ padding: "20px" }}>No data available</h2>;

  // ------------------ Chart Data ------------------

  // 1. Closed vs Pipeline (Pie)
  const leadsPieData = {
    labels: ["Closed", "Pipeline"],
    datasets: [
      {
        data: [data.closedLeads, data.pipelineLeads],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  // 2. Leads by Agent (Bar)
  const agentBarData = {
    labels: data.leadsByAgent.map((a) => a.agent),
    datasets: [
      {
        label: "Closed Leads",
        data: data.leadsByAgent.map((a) => a.closed),
        backgroundColor: "#2196F3",
      },
    ],
  };

  // 3. Status Distribution (Pie)
  const statusPieData = {
    labels: data.statusDistribution.map((s) => s.status),
    datasets: [
      {
        data: data.statusDistribution.map((s) => s.count),
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#03A9F4",
          "#E91E63",
          "#9C27B0",
        ],
      },
    ],
  };

  // ------------------ UI ------------------

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      {/* <div
        style={{
          width: "200px",
          background: "#f5f5f5",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </div> */}

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>📊 Anvaya CRM Reports</h1>

        {/* Top Charts */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Pie Chart: Closed vs Pipeline */}
          <div
            style={{
              flex: "1",
              minWidth: "250px",
              //  height: "450px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              Leads Closed vs Pipeline
            </h3>
            <Pie data={leadsPieData} />
          </div>

          {/* Pie Chart: Status Distribution */}
          <div
            style={{
              flex: "1",
              minWidth: "250px",
              //  height: "450px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              Lead Status Distribution
            </h3>
            <Pie data={statusPieData} />
          </div>
        </div>

        {/* Bar Chart */}
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
             height: "350px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Leads Closed by Sales Agent
          </h3>
          <Bar data={agentBarData} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;