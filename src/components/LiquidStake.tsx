import { useContext, useState } from "react";
import BigNumber from "bignumber.js";
import FAQSection from "./FAQSection";
import { GlobalContext } from "../context/GlobalState";
import LSInput from "./LSInput";
import MiddleContainer from "./MiddleContainer";

export default function LiquidStake() {
  const { setToken1, setToken2, token2, token1, accountId, handleConnect } = useContext(GlobalContext);
  const [isStake, setIsStake] = useState<boolean>(true);
  const borderColor = isStake ? "border-indigo-600" : "border-blue-500";
  async function updateStakeAmt(event: any) {
    const val = event.target.value;
    setToken1({ ...token1, value: new BigNumber(val) });
  }

  async function handleStake() {
    window.alert("I'm a teapot!");
  }

  return (
    <MiddleContainer>
      <div className="flex w-full h-full justify-center items-center pt-24 overflow-scroll hm-hide-scrollbar">
        <div className="w-full min-h-full max-w-[34rem]">
          <div className=" bg-black bg-opacity-90 rounded-xl p-2 text-white">
            <div className="p-2">
              <div className={`p-4 ${isStake ? "purpleDGrad" : "cityDGrad"} rounded-xl `}>
                <div className="flex items-center justify-start">
                  <div className={`border-2 font-thin ${borderColor} p-[2px] mb-1 rounded-2xl bg-black bg-opacity-30 transition-colors`}>
                    <button onClick={() => setIsStake(true)} className={`px-8 rounded-xl ${isStake ? "bg-indigo-600" : "bg-transparent"}`}>
                      Stake
                    </button>
                    <button
                      onClick={() => {
                        setIsStake(false);
                      }}
                      className={`px-5 rounded-xl ${!isStake ? "bg-city-blue" : "bg-transparent"}`}
                    >
                      Unstake
                    </button>
                  </div>
                </div>
                <div className={`rounded-xl px-4 py-1 border-[.5px] transition-colors ${borderColor} flex items-center`}>
                  <LSInput updateFunction={updateStakeAmt} pos={1} />
                  <p>XXX</p>
                </div>
                <p className="mt-2">1 XXX ≈ 1 XXX</p>
              </div>
              <div className={`p-4 ${!isStake ? "purpleDGrad" : "cityDGrad"} rounded-xl mt-4`}>
                <p >Receive</p>
                <div className={`rounded-xl px-4 py-1  mt-2 border-[.5px] transition-colors ${!isStake ? "border-indigo-600" : "border-blue-500"} flex items-center`}>
                  <LSInput updateFunction={updateStakeAmt} pos={2} />
                  <p>XXX</p>
                </div>
              </div>
              <button
                onClick={accountId ? handleStake : () => handleConnect()}
                disabled={!accountId ? false : token1.value.gt(0) && token2.value.gt(0) ? false : true}
                className="txButton mt-5"
              >
                {accountId ? (isStake ? "Stake" : "Unstake") : "Connect Wallet"}
              </button>
            </div>
          </div>
          <FAQSection />
        </div>
      </div>
    </MiddleContainer>
  );
}
