
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppConsole from "./AppConsole.jsx";
import AuthPage from "./AuthPage.jsx";
import Terms from "./Terms.jsx";
import Privacy from "./Privacy.jsx";
import AiGovernance from "./AiGovernance.jsx";
import AiUsage from "./AiUsage.jsx";
import Cookies from "./Cookies.jsx";
import Contact from "./Contact.jsx";
import AdminConsole from "./AdminConsole.jsx";
import { getToken } from "./auth.js";

function Home() {
  return getToken() ? <Navigate to="/app" replace /> : <Navigate to="/auth" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppConsole />} />
        <Route path="/admin" element={<AdminConsole />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/ai-governance" element={<AiGovernance />} />
        <Route path="/legal/ai-usage" element={<AiUsage />} />
        <Route path="/legal/cookies" element={<Cookies />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
