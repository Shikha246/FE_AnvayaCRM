import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SalesPage from "./pages/Sales";
import LeadsPage from "./pages/LeadsPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import LeadDetails from "./pages/LeadDetails";
import LeadStatusPage from "./pages/LeadStatusPage";
import SalesAgentView from "./pages/SalesAgentView";
import SalesAgentManagementPage from "./pages/SalesAgentManagementPage";
import Layout from "./components/Layout";
import AddAgentPage from "./pages/AddAgentPage";
import DashboardPage from "./pages/DashboardPage";
import { SalesAgentProvider } from "./context/SalesAgentContext";
import ReportsPage from "./pages/ReportsPage";
function App() {
  return (
    <BrowserRouter>
    <SalesAgentProvider>
      <Routes>
        {/* Redirect root */}
        {/* <Route path="/" element={<Navigate to="/leads" />} /> */}

        {/* Layout wrapper */}
        <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="/leads/new" element={<CreateLeadPage />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/add/agents" element= {<AddAgentPage />} />
          <Route path="/leads/status" element={<LeadStatusPage />} />
          <Route path="/agents" element={<SalesAgentManagementPage /> } />
          <Route path="/agent-view/:id" element={<SalesAgentView />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
      </SalesAgentProvider>
    </BrowserRouter>
  );
}

export default App;