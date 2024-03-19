import Logo from "@/components/Logo";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div style={{padding:"0px 100px",marginTop:"20px"}}>
      <div>
        <Logo /> 
      </div>
      <div style={{marginTop:"50px"}}>{children}</div>
      <div>footer</div>
    </div>
  );
};

export default MainLayout;
