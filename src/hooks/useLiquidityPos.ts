import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { ILiquidityPosition } from '../@types/types';
import { getToken } from './useTokenList';
import BigNumber from 'bignumber.js';
import { bn } from '../utils/utils';

export default function useLiquidityPos(
  updatePool?: string | undefined,
  setUpdatePool?: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const {
    allStakedPools,
    setSingleLiquidityPos,
    chainId,
    accountId,
    setAllStakedPools,
    tokenIn,
    tokenOut,
    web3,
    stake,
    config,
  } = useContext(GlobalContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // sets all staked pools, sets singleLiquidityPos when there is a pool address in the url
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pool = queryParams.get('pool');

    if (web3 && accountId && chainId) {
      let dtPool: string | null = pool;

      const localStoragePoolData = getLocalPoolData(accountId, chainId);

      const findPool = (pool: { address: string }) => pool.address === dtPool;

      if (allStakedPools && dtPool) {
        const singlePosition = allStakedPools.find(findPool);
        setSingleLiquidityPos(singlePosition);
      } else if (localStoragePoolData) {
        setAllStakedPools(localStoragePoolData);
        if (dtPool) {
          updateSingleStakePool(dtPool).then((res) => {
            if (res) {
              setSingleLiquidityPos(res);
              const oldDataIndex = localStoragePoolData.findIndex(findPool);
              localStoragePoolData.splice(oldDataIndex, 1, res);
              setAllStakedPools(localStoragePoolData);
            }
          });
        }
      } else if (dtPool) {
        updateSingleStakePool(dtPool).then((res) => {
          if (res) {
            setAllStakedPools([res]);
            setSingleLiquidityPos(res);
          }
        });
      }
    }
  }, [tokenIn.info?.address, tokenOut.info?.address, accountId, web3]);

  const nextToImport = useRef(updatePool);
  useEffect(() => {
    if (updatePool && chainId && !loading) {
      updateSingleStakePool(updatePool)
        .then((res) => {
          if (res && allStakedPools) {
            const newData = allStakedPools;
            const index = allStakedPools.findIndex((item) => item.address === res.address);
            index >= 0 ? newData.splice(index, 1, res) : newData.push(res);
            setAllStakedPools(newData);
            setLocalPoolDataStorage(newData, chainId);
          } else if (res) {
            setAllStakedPools([res]);
            setLocalPoolDataStorage([res], chainId);
          }
        })
        .catch(console.error)
        .finally(() => {
          if (setUpdatePool) setUpdatePool(nextToImport.current);
          setLoading(false);
        });
    } else if (loading) {
      nextToImport.current = updatePool;
    }
  }, [updatePool, loading]);

  async function updateSingleStakePool(poolAddress: string): Promise<ILiquidityPosition | void> {
    if (!accountId || !web3 || !chainId || !stake || !config || !config.default.oceanTokenAddress) return;
    try {
      poolAddress = poolAddress.toLowerCase();
      const baseTokenAddress = await stake.getBaseToken(poolAddress);

      const [baseToken, datatoken] = await Promise.all([
        getToken(web3, chainId, baseTokenAddress, 'exchange', config, accountId),
        getToken(web3, chainId, poolAddress, 'pool', config, accountId),
      ]);

      if (!baseToken || !datatoken) throw new Error('BaseToken or Datatoken not found.');

      const [shares, totalPoolShares, baseTokenReserve, datatokenReserve] = await Promise.all([
        stake.sharesBalance(accountId, poolAddress),
        stake.getTotalPoolShares(poolAddress),
        stake.getReserve(poolAddress, baseToken.address, baseToken.decimals),
        stake.getReserve(poolAddress, datatoken.address, datatoken.decimals),
      ]);

      const sharesBN = bn(shares);
      const userPoolSharePerc = sharesBN.div(totalPoolShares).multipliedBy(100);

      return {
        address: poolAddress,
        accountId,
        totalPoolShares: bn(totalPoolShares),
        yourPoolSharePerc: userPoolSharePerc,
        baseAmount: bn(baseTokenReserve),
        dtAmount: bn(datatokenReserve),
        baseToken,
        datatoken,
        shares: bn(shares),
      };
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Set local pool data storage.
 *
 * @param allStakedPools
 * @param chainId
 */

export function setLocalPoolDataStorage(allStakedPools: ILiquidityPosition[], chainId: string | number) {
  const key = `allStakedPools@${chainId}@${allStakedPools[0].accountId.toLowerCase()}`;
  localStorage.setItem(key, JSON.stringify(allStakedPools));
}

/**
 * Get local pool data storage.
 *
 * @param accountId
 * @param chainId
 * @returns
 */
export function getLocalPoolData(accountId: string, chainId: string | number): ILiquidityPosition[] | null {
  const lowerCaseId = accountId.toLowerCase();
  const pooldataString = localStorage.getItem(`allStakedPools@${chainId}@${lowerCaseId}`);
  if (!pooldataString) return null;
  const poolData: ILiquidityPosition[] = JSON.parse(pooldataString);
  return poolData.map((pool) => {
    let { dtAmount, baseAmount, totalPoolShares, yourPoolSharePerc, shares } = pool;
    if (dtAmount) dtAmount = new BigNumber(dtAmount);
    if (baseAmount) baseAmount = new BigNumber(baseAmount);
    if (totalPoolShares) totalPoolShares = new BigNumber(totalPoolShares);
    if (yourPoolSharePerc) yourPoolSharePerc = new BigNumber(yourPoolSharePerc);
    shares = new BigNumber(shares);
    return {
      ...pool,
      dtAmount,
      baseAmount,
      totalPoolShares,
      yourPoolSharePerc,
      shares,
    };
  });
}
