import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { initializeGA } from "./context/Analytics";
import { GlobalContext } from "./context/GlobalState";
import TransactionDoneModal from "./common-modals/TransactionDoneModal";
import ConfirmTxDetailsModal from "./swap/ConfirmTxDetailsModal";
import UnsupportedNetwork from "./common-modals/UnsupportedNetwork";
import LiquidityPosition from "./liquidity-position/LiquidityPosition";
import UnlockTokenModal from "./common-modals/UnlockTokenModal";
import DisclaimerModal from "./common-modals/DisclaimerModal";
import TxHistoryModal from "./transaction-history/TxHistoryModal";
import WatchLocation from "./util-components/WatchLocation";
import CookiesModal from "./common-modals/CookiesModal";
import ConfirmModal from "./common-modals/ConfirmModal";
import useTxHistory from "./hooks/useTxHistory";
import LiquidStake from "./stake/LiquidStake";
import LandingPage from "./common/LandingPage";
import TokenModal from "./token-modal/TokenModal";
import BigNumber from "bignumber.js";
import Snackbar from "./common/Snackbar";
import Unstake from "./stake/Unstake";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Stake from "./stake/Stake";
import Swap from "./swap/Swap";

BigNumber.config({ DECIMAL_PLACES: 18, ROUNDING_MODE: BigNumber.ROUND_DOWN, EXPONENTIAL_AT: 18 });

function App() {
  const { unsupportedNet, cookiesAllowed, location, bgOff, blurBG } = useContext(GlobalContext);

  document.getElementById("loader");
  useTxHistory();

  useEffect(() => {
    if (cookiesAllowed) {
      initializeGA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookiesAllowed]);

  useEffect(() => {
    document.getElementById("loadText")?.remove();
    document.getElementById("loadCenter")?.remove();
    document.getElementById("loader")?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative">
      <div
        className={`w-full h-full overflow-hidden ${blurBG ? "blur-xs" : "blur-none"} ${
          bgOff ? "" : location === "/trade" ? "lg:bg-dataXtrade lg:bg-cover lg:bg-top" : location !== "/" ? "lg:bg-dataXstake lg:bg-cover lg:bg-bottom" : ""
        }`}
      >
        <div className={`min-h-full flex flex-col justify-between overflow-hidden w-full ${blurBG ? "bg-black bg-opacity-40" : ""}`}>
          {unsupportedNet ? (
            <UnsupportedNetwork />
          ) : (
            <Router>
              <WatchLocation />
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/trade" element={<Swap />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/stake/remove" element={<Unstake />} />
                <Route path="/stake/list" element={<LiquidityPosition />} />
                <Route path="/stake/liquid" element={<LiquidStake />} />
              </Routes>
            </Router>
          )}
          <Footer />
        </div>
      </div>
      <Snackbar />
      <UnlockTokenModal />
      <CookiesModal />
      <DisclaimerModal />
      <TxHistoryModal />
      <TokenModal />
      <ConfirmModal />
      <TransactionDoneModal />
      <ConfirmTxDetailsModal />
    </div>
  );
}

export default App;
