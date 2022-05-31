import { BsArrowDown, BsShuffle, BsX } from 'react-icons/bs';
import { useContext } from 'react';
import ConfirmTxItem from './ConfirmTxItem';
import ConfirmTxListItem from './ConfirmTxListItem';
import { GlobalContext } from '../context/GlobalState';
import { PulseLoader } from 'react-spinners';
import CenterModal from './CenterModal';

export default function ConfirmSwapModal() {
  const {
    token1,
    token2,
    setShowConfirmTxDetails,
    showConfirmTxDetails,
    preTxDetails,
    setLastTx,
    setConfirmingTx,
    setTxApproved,
    setBlurBG,
    setExecuteSwap,
    swapFee,
    minReceived,
    confirmingTx,
    location,
  } = useContext(GlobalContext);

  function confirm() {
    if (confirmingTx) return;
    setConfirmingTx(true);
    setLastTx(preTxDetails);
    setTxApproved(true);
  }

  function close() {
    setExecuteSwap(false);
    setShowConfirmTxDetails(false);
    setBlurBG(false);
    setTxApproved(false);
  }
  return showConfirmTxDetails && location === '/trade' ? (
    <CenterModal
      className={`sm:max-w-md w-full z-30 shadow ${showConfirmTxDetails ? 'block' : 'hidden'}`}
      onOutsideClick={close}
      id="confirmSwapModal"
    >
      <div className="py-8 px-4 md:px-8 bg-black bg-opacity-95 border rounded-lg hm-box mx-3 md:mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-gray-300 text-xl">Confirm swap</p>
          <BsX id="closeConfrimSwapModalbtn" onClick={close} role="button" size={28} />
        </div>
        <div className="mt-4">
          <ConfirmTxItem pos={1} />
          <BsArrowDown className="ml-2 my-2 text-gray-300" size={24} />
          <ConfirmTxItem pos={2} />
        </div>
        <div className="mt-6 flex justify-between">
          <p className="text-gray-400 text-sm">Exchange rate</p>
          <p id="confirmSwapModalSwapRate" className="text-gray-400 text-sm grid grid-flow-col items-center gap-2">
            1 {token1.info?.symbol} = {preTxDetails?.postExchange?.dp(5).toString()} {token2.info?.symbol}
            <BsShuffle size={12} />
          </p>
        </div>
        <div className="mt-4">
          {/* <ConfirmSwapListItem name="Route" value="ETH > KNC" /> */}
          <ConfirmTxListItem name="Minimum received" value={minReceived.dp(5).toString()} />
          {/* <ConfirmSwapListItem name="Price impact" value="-0.62%" valueClass="text-green-500" /> */}
          <ConfirmTxListItem name="Swap fee" value={swapFee?.dp(5).toString() + ' ' + token1.info?.symbol} />
          <ConfirmTxListItem name="DataX fee" value="0" />
          {/* <ConfirmSwapListItem name="DataX fee" value="0.000000006 ETH" /> */}
          <ConfirmTxListItem name="Slippage tolerance" value={preTxDetails?.slippage + '%'} />
        </div>
        <div className="mt-4">
          <p className="text-gray-300 text-sm">
            You will receive at least {minReceived.dp(5).toString()} {token2.info?.symbol} or the transaction will
            revert.
          </p>
        </div>
        <div className="mt-4">
          <button
            id="confirmSwapModalBtn"
            onClick={confirm}
            disabled={!!confirmingTx}
            className="px-4 py-2 text-lg w-full flex justify-center items-center confirmBtn rounded-lg"
          >
            {confirmingTx ? (
              <div className="h-full flex items-end">
                <p className="mx-1 text-gray-200">Confirming</p>
                <PulseLoader size="2px" color="white" />
              </div>
            ) : (
              'Confirm Swap'
            )}
          </button>
        </div>
      </div>
    </CenterModal>
  ) : (
    <></>
  );
}
