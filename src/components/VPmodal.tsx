import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TokenSelect from './TokenSelect';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AllocationInfo from './AllocationsInfo';
import { BtnManager, INITIAL_BUTTON_STATE } from '../utils/utils';
import { ITxDetails, IBtnProps, IPoolMetaData } from '../@types/types';

export default function VPmodal() {
  const GlobalValues = useContext(GlobalContext);
  const [maxStakeAmt, setMaxStakeAmt] = useState<BigNumber>(new BigNumber(0));
  const [btnProps, setBtnProps] = useState<IBtnProps>(INITIAL_BUTTON_STATE);
  const [totalVpBalance, setTotalBalance] = useState(5000);
  const [percentageVP, setPercentageVP] = useState(0);
  const [valueVP, setValueVP] = useState(0);

  const {
    accountId,
    chainId,
    setConfirmingTx,
    tokenOut,
    setTokenOut,
    tokenIn,
    setTokenIn,
    setLastTx,
    lastTx,
    tokensCleared,
    setSnackbarItem,
    showDescModal,
    executeStake,
    setExecuteStake,
    setBlurBG,
    setShowConfirmTxDetails,
    setTxApproved,
    stake,
    refAddress,
    config,
    slippage,
    trade,
    path,
    web3,
    swapFee,
    spotSwapFee,
    setSwapFee,
    baseMinExchange,
    meta,
    executeUnlock,
    preTxDetails,
    balanceTokenIn,
    setBalanceTokenIn,
    showConfirmTxDetails,
    approving,
    handleConnect,
  } = useContext(GlobalContext);
  useEffect(() => {
    const btnManager = new BtnManager(setBtnProps);
    if (!accountId) {
      btnManager.updateBtn();
    } else if (accountId && !tokenIn.info) {
      btnManager.updateBtn('Delegate And Allocate', true);
    } else if (accountId && tokenIn.info) {
      btnManager.updateBtn('Delegate And Allocate', false);
    }
    // } else if (!tokenIn.info) {
    //   btnManager.updateBtn('Select a Token', true);
    // } else if (path && path?.length === 0) {
    //   btnManager.updateBtn('Routing...', true);
    // } else if (!path) {
    //   btnManager.updateBtn('Insufficient Liquidity', true);
    // } else if (!tokenIn.value || tokenIn.value.eq(0)) {
    //   btnManager.updateBtn('Enter Stake Amount', true);
    // } else if (balanceTokenIn?.eq(0) || (balanceTokenIn && tokenIn.value.gt(balanceTokenIn))) {
    //   btnManager.updateBtn(`Not Enough ${tokenIn.info?.symbol} Balance`, true);
    // } else if (lastTx?.status === 'Pending' && (executeStake || executeUnlock)) {
    //   btnManager.updateBtn('Processing Transaction...', true);
    // } else if (tokenIn.allowance?.lt(tokenIn.value)) {
    //   btnManager.updateBtn(`Unlock ${tokenIn.info?.symbol}`, false);
    // } else {
    //   btnManager.updateBtn('Stake', false, btnProps);
  }, [
    accountId,
    chainId,
    tokenOut,
    tokenIn.value,
    balanceTokenIn,

    tokenIn.info,
    lastTx?.status,
    path?.length,
    path,
    preTxDetails?.status,
    accountId,
    executeStake,
    executeUnlock,
    showConfirmTxDetails,
    approving,
  ]);

  useEffect(() => {
    console.log('global values', GlobalValues);
  }, [GlobalValues]);

  const getTotalDelegationHandler = async () => {
    console.log('to get total delegation');
  };
  const getUserDelegationHandler = async () => {
    console.log('to get user delegation');
  };
  const delegateAndAllocateHandler = async () => {
    console.log('to delegate');
  };

  const vpPercentageChangeHandler = (value: number) => {
    setPercentageVP(value);
    setValueVP(Number(((value / 100) * totalVpBalance).toFixed(2)));
  };

  //   FOR SLIDER
  const marks = {
    0: {
      style: { height: 6, backgroundColor: '#333' },
      label: ' ',
    },
    25: {
      style: { height: 6, backgroundColor: '#333' },
      label: ' ',
    },
    50: {
      style: { height: 12, color: '#333' },
      label: ' ',
    },
    75: {
      style: { height: 12, color: '#333' },
      label: ' ',
    },
    100: {
      style: { height: 12, color: '#333' },
      label: ' ',
    },
  };

  const railStyle = { backgroundColor: '#ccc' };
  const dotStyle = {
    backgroundColor: '#fff',
    height: '21px',
    width: '1px',
    bottom: '50%',
    transform: 'translateY(50%)',
    borderRadius: 0,
  };
  const activeDotStyle = {
    backgroundColor: '#fff',
    height: '21px',
    width: '1px',
    bottom: '50%',
    borderColor: 'white',
    transform: 'translateY(50%)',
    borderRadius: 0,
  };
  const handleStyle = {
    border: 'none',
    opacity: 1,
    backgroundColor: 'rgb(254, 202, 202)',
    width: 18,
    height: 18,
    marginTop: -8,
    boxShadow: 'none',
  };

  return (
    <>
      <div
        className={`absolute w-full max-w-[32rem] top-1/2 left-1/2 transition-transform transform duration-500 ${
          showDescModal && tokenOut.info?.pools[0].id ? 'translate-x-full 2lg:translate-x-[10%]' : '-translate-x-1/2'
        } -translate-y-1/2 `}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="lg:mx-auto sm:mx-4 mx-3">
            <div id="stakeModal" className="lg:w-107  bg-black bg-opacity-90 rounded-lg p-3 hm-box">
              <div className="px-4 relative "></div>
              <TokenSelect
                max={maxStakeAmt}
                otherToken={''}
                pos={1}
                onPerc={(num: number) => {
                  vpPercentageChangeHandler(num);
                }}
                setToken={() => {}}
                token={tokenIn}
                updateNum={(num: number) => {
                  setPercentageVP(Number(((num / totalVpBalance) * 100).toFixed(2)));
                  setValueVP(num);
                }}
                percentValue={percentageVP}
                valueVP={valueVP}
                totalVpBalance={totalVpBalance}
                onMax={() => {
                  setValueVP(totalVpBalance);
                  setPercentageVP(100);
                }}
              />
              <div className="range-slider">
                <Slider
                  onChange={tokenIn.info && vpPercentageChangeHandler}
                  handleStyle={handleStyle}
                  railStyle={railStyle}
                  dotStyle={dotStyle}
                  activeDotStyle={activeDotStyle}
                  marks={marks}
                  value={percentageVP}
                />
              </div>

              <AllocationInfo
                rightHeading={'Your VP Allocation'}
                leftHeading={'Total VP Allocation'}
                rightValue={100}
                leftVaue={50}
              />

              {/* <PositionBox loading={loading} setLoading={setLoading} /> */}
              <div className="flex mt-3">
                <button
                  id="executeStake"
                  disabled={btnProps.disabled}
                  onClick={() => {
                    !accountId && handleConnect();
                  }}
                  className="txButton"
                >
                  {btnProps.text}
                </button>
                {/* <TxSettings /> */}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              {/* <ViewDescBtn /> */}
              <Link id="lpLink" to="/stake/list" className="text-gray-300 hover:text-gray-100 transition-colors">
                {'<'}Dataset Description
              </Link>
              <Link id="lpLink" to="/stake/list" className="text-gray-300 hover:text-gray-100 transition-colors">
                Your Delegations {'>'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
