import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import LiquidityPositionItem from "./LiquidityPositionItem";
import UserMessage from "./UserMessage";
import { MoonLoader } from "react-spinners";
import { IUserMessage, ILiquidityPosition } from "../utils/types";
import useLiquidityPos from "../hooks/useLiquidityPos";
import MiddleContainer from "./MiddleContainer";

export default function LiquidityPosition() {
  const { accountId, allStakedPools, setShowTokenModal, setBlurBG, importPool } = useContext(GlobalContext);
  const [userMessage, setUserMessage] = useState<string | IUserMessage | null>("Dont see your tokens? Import a pool by name with the import button below.");
  const [messageId, setMessageId] = useState<string | null>("importMessage");
  const [updatePool, setUpdatePool] = useState<string>();
  useLiquidityPos(updatePool, setUpdatePool);

  useEffect(() => {
    if (!accountId) {
      setUserMessage("Connect your wallet to see staked oceans.");
      setMessageId("connectWalletMessage");
    } else if (accountId && !allStakedPools) {
      setMessageId("importMessage");
      setUserMessage("Dont see your tokens? Import a pool by name with the import button below.");
    } else if (accountId && allStakedPools) {
      setUserMessage(null);
    }
  }, [allStakedPools, accountId]);

  return (
    <MiddleContainer>
      <div className="flex flex-col justify-center h-full">
        <div id="lpModal" className="bg-black bg-opacity-90 w-full lg:w-107 p-2 max-h-full rounded-2xl px-3 m-auto flex flex-col justify-center">
          <div className="flex flex-row w-full m-auto">
            <div className="w-full flex rounded-lg justify-between">
              <h2 className="text-2xl">Your staked pools</h2>
              {importPool && accountId ? <MoonLoader color="white" size="25px" /> : <></>}
            </div>
          </div>

          {userMessage ? (
            <div className="flex flex-row justify-center items-center p-4 lg:p-2 h-60 bg-trade-darkBlue bg-opacity-40 rounded-lg">
              <UserMessage id={messageId} message={userMessage} pulse={false} container={false} />
            </div>
          ) : (
            <ul className={`mt-5 pr-3 pl-3 overflow-scroll hm-hide-scrollbar`}>
              {allStakedPools?.map((pool: ILiquidityPosition, index: number) => (
                <LiquidityPositionItem singleLiqPosItem={pool} index={index} />
              ))}
            </ul>
          )}

          <div className="w-full flex justify-center">
            <div className="w-full pr-1">
              <button
                id="importStakeBtn"
                title="Import your stake information."
                disabled={accountId ? false : true}
                onClick={() => {
                  setShowTokenModal(true);
                  setBlurBG(true);
                }}
                className={`p-2 w-full mt-2 txButton rounded-lg ${accountId ? "" : "cursor-not-allowed"}`}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </MiddleContainer>
  );
}
