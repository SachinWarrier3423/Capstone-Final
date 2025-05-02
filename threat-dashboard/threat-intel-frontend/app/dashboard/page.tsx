import React from "react";
import { useAuth } from "../../hooks/use-auth";

const DashboardPage = () => {
  const { getAuthHeaders } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Threat Intelligence Dashboard!</p>
      {/* Add dashboard components here */}
    </div>
  );
};

export default DashboardPage;