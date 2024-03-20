import Logo from "@/components/Logo";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div style={{ padding: "20px", backgroundColor: "#F4F6FA" }}>
        <Logo />
      </div>
      <div className="container" style={{ marginTop: "50px",marginBottom: "50px" }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
