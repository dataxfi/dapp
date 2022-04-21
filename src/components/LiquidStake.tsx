import { useContext, useState } from "react";
import BigNumber from "bignumber.js";
import FAQSection from "./FAQSection";
import { GlobalContext } from "../context/GlobalState";
import LSInput from "./LSInput";
import MiddleContainer from "./MiddleContainer";
import { BsArrowDown } from "react-icons/bs";

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
      <div className="flex w-full h-full justify-center items-center overflow-scroll hm-hide-scrollbar p-2">
        <div className="w-full min-h-full max-w-[34rem] flex flex-col m-auto" style={{justifyContent: "safe center"}}>
          <div className="bg-black bg-opacity-90 rounded-2xl p-2 text-white">
            <div className={`p-4 ${isStake ? "purpleDGrad" : "cityDGrad"} rounded-xl `}>
              <div className="flex items-center justify-start">
                <div className={`border-2 font-thin ${borderColor} p-[2px] mb-1 rounded-2xl bg-black bg-opacity-30 transition-colors`}>
                  <button onClick={() => setIsStake(true)} className={`px-5 rounded-xl ${isStake ? "bg-indigo-500" : "bg-transparent"}`}>
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
            <div className="relative">
              <div className="absolute rounded-full bg-gradient-to-b from-transparent via-black to-black bg-opacity-90 h-10 w-10 transform left-1/2 -translate-x-1/2 top-[-10px] flex justify-center items-center">
                <BsArrowDown />
              </div>
            </div>
            <div className={`p-4 ${!isStake ? "purpleDGrad" : "cityDGrad"} rounded-xl mt-4`}>
              <p>Receive</p>
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
          <div className="bg-black opacity-90 py-2 px-4 rounded-2xl my-2 font-light text-xs">
            <table className="w-full text-left">
              <tr>
                <th>Annual Percentage Rate</th>
                <th className="text-right">~127.23413%</th>
              </tr>{" "}
              <tr>
                <th>Unstaking Cooldown Period</th>
                <th className="text-right">3 days</th>
              </tr>{" "}
              <tr>
                <th>Exchange Rate</th>
                <th className="text-right">1 XXX ≈ 1 XXX</th>
              </tr>{" "}
              <tr>
                <th>Total Stakers</th>
                <th className="text-right">3.4M</th>
              </tr>
            </table>
          </div>
          <FAQSection />
        </div>
      </div>
    </MiddleContainer>
  );
}
