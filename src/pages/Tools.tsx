
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Redirects to the new /tools directory page
const Tools = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/tools-directory", { replace: true });
  }, [navigate]);
  return null;
};

export default Tools;
