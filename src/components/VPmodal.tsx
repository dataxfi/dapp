import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TokenSelect from './TokenSelect';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function VPmodal() {
  const { provider, accountId, tokenIn, showDescModal, tokenOut } = useContext(GlobalContext);
  const GlobalValues = useContext(GlobalContext);

  const [maxStakeAmt, setMaxStakeAmt] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    console.log('provider is', provider);
  }, [provider]);

  useEffect(() => {
    console.log('global values', GlobalValues);
  }, [GlobalValues]);

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
                onPerc={(num: string) => {}}
                setToken={() => {}}
                token={tokenIn}
                updateNum={(num: string) => {}}
                onMax={() => {}}
              />
              <div className="range-slider">
                <Slider
                  onChange={(val) => {
                    console.log(val);
                  }}
                  handleStyle={handleStyle}
                  railStyle={railStyle}
                  dotStyle={dotStyle}
                  activeDotStyle={activeDotStyle}
                  marks={marks}
                />
              </div>

              <div className="rounded-lg border allocation-holder  px-4 py-2  flex justify-around ">
                <div className="flex flex-col text-center">
                  <h5>Total VP Allocation</h5>
                  <span>67</span>
                </div>
                <div className="flex flex-col text-center">
                  <h5>Your VP Allocation</h5>
                  <small className="bg-neutral-300">67</small>
                </div>
              </div>

              {/* <PositionBox loading={loading} setLoading={setLoading} /> */}
              <div className="flex mt-3">
                <button id="executeStake" onClick={() => {}} className="txButton" disabled={false}>
                  {'Delegate and Allocate'}
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
