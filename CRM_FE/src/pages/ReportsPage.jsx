import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import "bootstrap/dist/css/bootstrap.min.css";

// Register ChartJS
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
      const res = await axios.get(
        "https://be-anvaya-crm.vercel.app/api/reports"
      );

      setData(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Loading ----------------

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          ></div>

          <h4 className="text-muted">
            Loading Reports...
          </h4>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          No report data available
        </div>
      </div>
    );
  }

  // ---------------- Chart Data ----------------

  // Closed vs Pipeline
  const leadsPieData = {
    labels: ["Closed", "Pipeline"],
    datasets: [
      {
        data: [data.closedLeads, data.pipelineLeads],
        backgroundColor: ["#198754", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  // Leads by Agent
  const agentBarData = {
    labels: data.leadsByAgent.map((a) => a.agent),
    datasets: [
      {
        label: "Closed Leads",
        data: data.leadsByAgent.map((a) => a.closed),
        backgroundColor: "#0d6efd",
        borderRadius: 8,
      },
    ],
  };

  // Status Distribution
  const statusPieData = {
    labels: data.statusDistribution.map((s) => s.status),
    datasets: [
      {
        data: data.statusDistribution.map((s) => s.count),
        backgroundColor: [
          "#198754",
          "#fd7e14",
          "#0dcaf0",
          "#d63384",
          "#6f42c1",
        ],
        borderWidth: 1,
      },
    ],
  };

  // ---------------- Chart Options ----------------

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        labels: {
          font: {
            size: window.innerWidth < 768 ? 14 : 16,
            weight: "bold",
          },
          padding: 20,
        },
      },

      tooltip: {
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          font: {
            size: window.innerWidth < 768 ? 14 : 16,
            weight: "bold",
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
            weight: "bold",
          },
        },
      },

      y: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
          },
        },
      },
    },
  };

  // ---------------- Dashboard Cards ----------------

  const totalLeads =
    data.closedLeads + data.pipelineLeads;

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h1
          className="fw-bold text-primary"
          style={{
            fontSize:
              window.innerWidth < 768 ? "1.7rem" : "2.5rem",
          }}
        >
          📊 Anvaya CRM Reports
        </h1>

        <p
          className="text-muted"
          style={{
            fontSize:
              window.innerWidth < 768 ? "1rem" : "1.1rem",
          }}
        >
          Analytics and insights for your CRM
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">

        {/* Total Leads */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h6
                className="text-muted"
                style={{ fontSize: "1rem" }}
              >
                Total Leads
              </h6>

              <h2
                className="fw-bold text-dark"
                style={{ fontSize: "2rem" }}
              >
                {totalLeads}
              </h2>
            </div>
          </div>
        </div>

        {/* Closed Leads */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h6
                className="text-muted"
                style={{ fontSize: "1rem" }}
              >
                Closed Leads
              </h6>

              <h2
                className="fw-bold text-success"
                style={{ fontSize: "2rem" }}
              >
                {data.closedLeads}
              </h2>
            </div>
          </div>
        </div>

        {/* Pipeline Leads */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h6
                className="text-muted"
                style={{ fontSize: "1rem" }}
              >
                Pipeline Leads
              </h6>

              <h2
                className="fw-bold text-warning"
                style={{ fontSize: "2rem" }}
              >
                {data.pipelineLeads}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Top Charts */}
      <div className="row g-4">

        {/* Closed vs Pipeline */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5
                  className="fw-bold mb-0"
                  style={{
                    fontSize:
                      window.innerWidth < 768
                        ? "1rem"
                        : "1.3rem",
                  }}
                >
                  Leads Closed vs Pipeline
                </h5>

                <span
                  className="badge bg-primary"
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  Overview
                </span>
              </div>

              <div
                style={{
                  height: "320px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pie
                  data={leadsPieData}
                  options={pieOptions}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5
                  className="fw-bold mb-0"
                  style={{
                    fontSize:
                      window.innerWidth < 768
                        ? "1rem"
                        : "1.3rem",
                  }}
                >
                  Lead Status Distribution
                </h5>

                <span
                  className="badge bg-info"
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  Status
                </span>
              </div>

              <div
                style={{
                  height: "320px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pie
                  data={statusPieData}
                  options={pieOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card border-0 shadow-sm rounded-4 mt-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5
              className="fw-bold mb-0"
              style={{
                fontSize:
                  window.innerWidth < 768
                    ? "1rem"
                    : "1.3rem",
              }}
            >
              Leads Closed by Sales Agent
            </h5>

            <span
              className="badge bg-success"
              style={{
                fontSize: "0.9rem",
              }}
            >
              Performance
            </span>
          </div>

          <div
            style={{
              height: "400px",
            }}
          >
            <Bar
              data={agentBarData}
              options={barOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;