import "./App.css";
import DisplayPanel from "./components/displayPanel/DisplayPanel";
import Navigation from "./components/navigation/Navigation";
import StakeAmount from "./components/stakeToken/StakeAmount";
import TokenApproval from "./components/stakeToken/TokenApproval";
import Wallet from "./components/wallet/Wallet";
import { StakingProvider } from "./context/StakingContext";

function App() {
  return (
    <>
      <Wallet>
        <Navigation />
        <StakingProvider>
          <DisplayPanel />
          <TokenApproval />
          <StakeAmount />
        </StakingProvider>
        
      </Wallet>
    </>
  );
}

export default App;
