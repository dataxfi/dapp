import { useContext, useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import { GlobalContext } from "../context/GlobalState";
import { getLocalTxHistory, getTxUrl, setLocalTxHistory } from "../hooks/useTxHistory";
import { ITxSelection, ITxHistory, ITxDetails } from "../utils/types";
import TxHistoryItem from "./TxHistoryItem";

function TxHistoryModal() {
  const {
    pendingTxs,
    txHistory,
    setTxHistory,
    showTxHistoryModal,
    setShowTxHistoryModal,
    chainId,
    accountId,
    ocean,
    setShowConfirmModal,
    setShowTxDone,
    showTxDone,
    showConfirmModal,
    setBlurBG
  } = useContext(GlobalContext);

  const [page, setPage] = useState([0, 5]);
  const [txSelection, setTxSelection] = useState<ITxSelection[]>([]);
  const [txsByDate, setTxsByDate] = useState<ITxSelection[]>([]);
  const [noTxHistory, setNoTxHistory] = useState<boolean>(false);
  const [tx1, setTx1] = useState<ITxDetails>();
  const [tx2, setTx2] = useState<ITxDetails>();
  const [tx3, setTx3] = useState<ITxDetails>();
  const [tx4, setTx4] = useState<ITxDetails>();
  const [tx5, setTx5] = useState<ITxDetails>();

  useEffect(() => {
    if (tx1 && tx2 && tx3 && tx4 && tx5 && accountId && chainId) {
      setNewTxHistory();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx1, tx2, tx3, tx4, tx5]);

  useEffect(() => {
    if (showTxHistoryModal) {
      if (showConfirmModal) setShowConfirmModal(false);
      if (showTxDone) setShowTxDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmModal, showTxDone, showTxHistoryModal]);

  useEffect(() => {
    if (!chainId || !accountId || !txHistory) return;
    try {
      if (accountId && txHistory && Object.keys(txHistory).length !== 0) {
        const parsedHistory = parseHistory(txHistory);
        if (!parsedHistory) return;
        setTxsByDate(parsedHistory);
        const selection = parsedHistory.slice(page[0], page[1]);
        setTxSelection(selection);
        setNoTxHistory(false);
      } else {
        const localHistory = getLocalTxHistory({ chainId, accountId });
        if (accountId && localHistory && Object.keys(localHistory).length !== 0) {
          if (setTxHistory) setTxHistory(localHistory);
          const parsedHistory = parseHistory(txHistory);
          if (!parsedHistory) return;
          setTxsByDate(parsedHistory);
          const selection = parsedHistory.slice(page[0], page[1]);
          setTxSelection(selection);
          setNoTxHistory(false);
        } else {
          setNoTxHistory(true);
        }
      }
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHistory, pendingTxs, chainId, accountId, page, ocean]);

  function setNewTxHistory() {
    if (!accountId || !chainId) return;
    const newTxHistory: ITxHistory = { ...txHistory };
    const txs = [tx1, tx2, tx3, tx4, tx5];
    txs.forEach((item) => {
      if (item) {
        newTxHistory[item.txDateId] = item;
      }
    });
    setTxHistory(newTxHistory);
    setLocalTxHistory({ txHistory: newTxHistory, accountId, chainId });
  }

  function resetTxs() {
    setTx1(undefined);
    setTx2(undefined);
    setTx3(undefined);
    setTx4(undefined);
    setTx5(undefined);
  }

  function parseHistory(history: ITxHistory) {
    if (!history || !accountId || !ocean) return;
    const txsByDate = [];
    for (let [txDateId, tx] of Object.entries(history)) {
      let txLink = getTxUrl({
        ocean,
        txHash: tx.txReceipt?.transactionHash,
        accountId,
      });
      if (!txLink) txLink = "/";
      txsByDate.push({ ...tx, txDateId, txLink });
    }
    //@ts-ignore
    txsByDate.sort((date1, date2) => Number(date2.txDateId) - Number(date1.txDateId));
    return txsByDate;
  }

  function lastPage() {
    if (page[0] === 0) return;
    resetTxs();
    setPage([page[0] - 5, page[1] - 5]);
  }

  function nextPage() {
    if (page[1] >= txsByDate.length) return;
    resetTxs();
    setPage([page[0] + 5, page[1] + 5]);
  }

  function pageRange() {
    if (page[1] > txSelection.length) return `${page[0] + 1} - ${txSelection.length + page[0]}`;
    return `${page[0] + 1} - ${page[1]}`;
  }

  function handleClose() {
    setNewTxHistory();
    setShowTxHistoryModal(false);
    setBlurBG(false)
  
  }

  return showTxHistoryModal ? (
    <div className="fixed center sm:max-w-md w-full z-20 shadow">
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="bg-black bg-opacity-95 border rounded-lg p-4 hm-box mx-3">
          <div className="flex justify-between mb-2">
            <h3>Recent Transactions</h3>
            <BsX
              onClick={handleClose}
              size={28}
              className="text-gray-200"
              role="button"
            />
          </div>
          {noTxHistory ? (
            <div className="px-5 pb-10 pt-5 w-full text-center text-gray-400">
              There is no transaction history for your account on this chain.
              {/* <button>Fetch From Chain</button> */}
            </div>
          ) : (
            <>
              <ul>
                {txSelection[0] ? <TxHistoryItem tx={txSelection[0]} index={0} setTx={setTx1} /> : <></>}
                {txSelection[1] ? <TxHistoryItem tx={txSelection[1]} index={1} setTx={setTx2} /> : <></>}
                {txSelection[2] ? <TxHistoryItem tx={txSelection[2]} index={2} setTx={setTx3} /> : <></>}
                {txSelection[3] ? <TxHistoryItem tx={txSelection[3]} index={3} setTx={setTx4} /> : <></>}
                {txSelection[4] ? <TxHistoryItem tx={txSelection[4]} index={4} setTx={setTx5} /> : <></>}
              </ul>{" "}
              <div className="flex justify-between">
                <button className="text-lg" onClick={lastPage}>
                  {"<"}
                </button>
                <p>{pageRange()}</p>
                <button className="text-lg" onClick={nextPage}>
                  {">"}
                </button>
              </div>
            </>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  ) : (
    <></>
  );
}

export default TxHistoryModal;
