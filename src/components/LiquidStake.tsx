import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import BigNumber from "bignumber.js";
import WrappedInput from "./WrappedInput";
import { Collapse } from "react-collapse";

export default function LiquidStake() {
  const [stakeAmt, setStakeAmt] = useState<BigNumber>(new BigNumber(0));
  const [isStake, setIsStake] = useState<boolean>(true);
  const [faqOpen, setFaqOpen] = useState<boolean>(false);
  const [qsOpen, setQsOpen] = useState<number[]>([]);
  async function updateStakeAmt(event: any) {
    const val = event.target.value;
    setStakeAmt(new BigNumber(val));
  }

  return (
    <div className="px-2 w-full h-full relative flex flex-grow">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="flex w-full h-full justify-center items-center pt-24 overflow-scroll hm-hide-scrollbar">
          <div className="w-full min-h-full max-w-[48rem]">
            <div className="w-full h-full flex items-center justify-center text-2xl font-light ">
              <div className={`border-2 font-thin ${isStake ? "border-indigo-600" : "border-blue-500"} p-[2px] mb-5 rounded-2xl bg-black bg-opacity-30 transition-colors`}>
                <button onClick={() => setIsStake(true)} className={`px-8 py-1 rounded-xl ${isStake ? "bg-indigo-600" : "bg-transparent"}`}>
                  Stake
                </button>
                <button
                  onClick={() => {
                    setIsStake(false);
                  }}
                  className={`px-8 py-1 rounded-xl ${!isStake ? "bg-city-blue" : "bg-transparent"}`}
                >
                  Unstake
                </button>
              </div>
            </div>
            <div className=" bg-black bg-opacity-90 rounded-xl p-2 text-white">
              <div className="p-8">
                <div
                  className={`py-6 px-4 bg-gradient-to-b ${
                    isStake ? "from-indigo-600 border-indigo-600" : "from-city-blue border-blue-500"
                  }  to-transparent  border rounded-xl `}
                >
                  <p className="text-xl">{isStake ? "Stake" : "Unstake"}</p>
                  <div className={`rounded-xl p-4 mt-2 border-[.5px] transition-colors ${isStake ? "border-indigo-600" : "border-blue-500"} flex items-center`}>
                    <DebounceInput
                      onChange={updateStakeAmt}
                      className="rounded bg-black bg-opacity-0 w-full text-2xl"
                      onWheel={(event: React.MouseEvent<HTMLInputElement>) => event.currentTarget.blur()}
                      onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                      element={WrappedInput}
                      type="number"
                      value={stakeAmt.dp(5).toString()}
                      debounceTimeout={500}
                    />
                    <p>XXX</p>
                  </div>
                  <p className="mt-2">1 XXX ≈ 1 XXX</p>
                </div>
                <div
                  className={`py-6 px-4 bg-gradient-to-b to-transparent border rounded-xl mt-4 ${
                    !isStake ? "from-indigo-600 border-indigo-600" : "from-city-blue border-blue-500"
                  }`}
                >
                  <p className="text-xl">Receive</p>
                  <div className={`rounded-xl p-4 mt-2 border-[.5px] transition-colors ${!isStake ? "border-indigo-600" : "border-blue-500"} flex items-center`}>
                    <DebounceInput
                      onChange={updateStakeAmt}
                      className="rounded bg-black bg-opacity-0 w-full text-2xl"
                      onWheel={(event: React.MouseEvent<HTMLInputElement>) => event.currentTarget.blur()}
                      onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                      element={WrappedInput}
                      type="number"
                      value={stakeAmt.dp(5).toString()}
                      debounceTimeout={500}
                    />
                    <p>XXX</p>
                  </div>
                </div>
                <button className="txButton mt-5">{isStake ? "Stake" : "Unstake"}</button>
              </div>
            </div>

            <div className="w-full rounded-xl p-4 mt-4 bg-black opacity-90" style={{ transition: "height 500ms" }}>
              <button className="w-full text-left font-bold text-xl hover:bg-white rounded-lg hover:bg-opacity-10 p-2" onClick={() => setFaqOpen(!faqOpen)}>
                FAQ {">"}
              </button>
              <Collapse isOpened={faqOpen}>
                <div className="p-4 rounded-xl bg-city-blue bg-opacity-30 my-2 hover:bg-opacity-50">
                  <button
                    onClick={() => {
                      !qsOpen.includes(1) ? setQsOpen([...qsOpen, 1]) : setQsOpen(qsOpen.filter((n) => n !== 1));
                    }}
                    className="text-left w-full font-semibold"
                  >
                    What is liquid staking?
                  </button>
                  <Collapse isOpened={qsOpen.includes(1) ? true : false} className="pt-2">
                    <p className="pt-2">
                      Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and
                      receive tradable liquid tokens in return. The DAO-controlled smart contract stakes these tokens using elected staking providers. As users funds are controlled
                      by the DAO, staking providers never have direct access to the users' assets.
                    </p>
                  </Collapse>
                </div>
                <div className="p-4 rounded-xl bg-city-blue bg-opacity-30 my-2 hover:bg-opacity-50">
                  <button
                    onClick={() => {
                      !qsOpen.includes(2) ? setQsOpen([...qsOpen, 2]) : setQsOpen(qsOpen.filter((n) => n !== 2));
                    }}
                    className="text-left w-full font-semibold rounded"
                  >
                    What is the difference between self staking and liquid staking?{" "}
                  </button>
                  <Collapse isOpened={qsOpen.includes(2) ? true : false}>
                    <p className="pt-2">
                      Ethereum is soon to be the biggest staking economy in the space. However, staking on ETH 2.0 requires expert knowledge and complex and costly infrastructure.
                      There are several reasons why - the main being the fact that slashing and offline penalties can get very severe if the staking is managed improperly. In
                      addition to this, self-staking brings with it a minimum deposit of 32 ETH and a token lock-up which could last years.
                    </p>
                  </Collapse>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
