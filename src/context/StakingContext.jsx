import { createContext, useState } from "react";

const StakingContext = createContext();

export const StakingProvider = ({ children }) => {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <StakingContext.Provider value={{ isLoad, setIsLoad }}>
      {children}
    </StakingContext.Provider>
  );
};

export default StakingContext;
