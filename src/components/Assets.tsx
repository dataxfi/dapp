import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TokenSelect from './TokenSelect';
import BigNumber from 'bignumber.js';
// import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AllocationInfo from './AllocationsInfo';
import { BtnManager, INITIAL_BUTTON_STATE } from '../utils/utils';
import { ITxDetails, IBtnProps, IPoolMetaData } from '../@types/types';
import Button from './Button';
import useTokenList from '../hooks/useTokenList';
import { useNavigate } from 'react-router-dom';

export default function Assets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useTokenList({ setLoading, setError });
  const navigate = useNavigate();
  const {
    setBlurBG,
    setShowTokenModal,
    datatokens,
    setDatatokens,
    ERC20Tokens,
    ERC20TokenResponse,
    setERC20Tokens,
    dtTokenResponse,
    location,
    chainId,
    accountId,
    selectTokenPos,
    setTokenIn,
    setTokenOut,
    showTokenModal,
    setImportPool,
    trade,
    web3,
    setPath,
  } = useContext(GlobalContext);

  const redirectHandler = (chainId: number, address: string) => {
    navigate(`/delegate?on=${chainId}&in=${address}&out=`);
  };

  return (
    <>
      <div className="flex items-center min-h-screen">
        <div
          className="w-75 custom-table bg-black bg-opacity-90 rounded-lg m-auto"
          style={{ height: '500px', overflow: 'auto' }}
        >
          {datatokens ? (
            <div className="table-responsive">
              <div className="table">
                <div className="mb-2 flex justify-start align-top table-row">
                  <div className="w-30 mob-autowidth white-space table-cell">
                    <h6>Asset Title</h6>
                  </div>
                  <div className="w-20 mob-autowidth white-space table-cell">
                    <h6>Network</h6>
                  </div>
                  <div className="w-20 mob-autowidth white-space table-cell">
                    <h6>My Delegation</h6>
                  </div>
                  <div className="w-30 mob-autowidth table-cell"></div>
                </div>

                {datatokens &&
                  datatokens.map((token, index) => {
                    console.log(token);
                    return (
                      <div
                        key={index}
                        className="bg-city-blue bg-opacity-30 table_row  table-row flex justify-start align-top p-4"
                      >
                        <div className="w-30 tabledata  table-cell ">
                          <p>{token.name}</p>
                        </div>
                        <div className="w-20 tabledata  table-cell ">
                          <p>{token.chainId === 137 ? 'Polygon' : ''}</p>
                        </div>
                        <div className="w-20 tabledata  table-cell ">
                          <h6>0.00 veOCEAN</h6>
                        </div>
                        <div className="w-30 tabledata  table-cell ">
                          <button
                            id="executeStake"
                            disabled={false}
                            onClick={() => {
                              redirectHandler(token.chainId, token.address);
                            }}
                            className="txButton p-0-imp delbtn p-2"
                          >
                            {'Delegate'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div style={{ height: '500px', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                width: '200px',
              }}
            >
              Wallet not connected
            </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
