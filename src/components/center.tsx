import React from "react";

export const Center: React.FC = ({ children }) => {
  return (
    <div className="text-center absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center flex-col">
      {children}
    </div>
  );
};
