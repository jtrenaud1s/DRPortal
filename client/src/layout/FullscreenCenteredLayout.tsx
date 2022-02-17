import React from "react";

const FullscreenCenteredLayout: React.FC = ({ children }) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      {children}
    </div>
  );
};

export default FullscreenCenteredLayout;
