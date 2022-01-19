import BigNumber from "bignumber.js";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext, bgLoadingStates, removeBgLoadingState } from "../context/GlobalState";
/**
 * Use to check inputs before debounce input. On change will fire immediately and check:
 * - If number is over max
 * - If decimals are greater than 5 places
 * - If there are trailing or leading 0(s)
 * If any of these conditions pass, there is no need to call the debounced on change function.
 * @param props
 * @returns
 */

export default function WrappedInput(props: any) {
  const { bgLoading, setBgLoading } = useContext(GlobalContext);
  const [internalState, setInternalState] = useState<BigNumber>(new BigNumber(0));
  const { pathname } = useLocation();
  /**
   * Determines whether to update the token state with a string or a bignumber
   * @param e
   * @returns boolean (true for update with bignumber)
   */
  function getUpdateParams(e: any) {
    if (pathname !== "/stakeX") setBgLoading([...bgLoading, bgLoadingStates.calcTrade]);
    const value = e.target.value;
    const bnVal = new BigNumber(value);
    let result: "dec" | "trail" | undefined;

    const afterPeriod = /\.(.*)/;
    const decimals = value.match(afterPeriod);

    //dont call db change if decimals >= 5
    if (decimals && decimals[1].length > 5) {
      result = "dec";
    }
    //dont call db change if the input is the same as the current value (ie. trailing/leading zero(s))
    else if (bnVal.toFixed(5) === internalState.toFixed(5)) {
      result = "trail";
    }

    setInternalState(bnVal);
    if (result === "dec") setBgLoading(removeBgLoadingState(bgLoading, bgLoadingStates.calcTrade));
    return result;
  }

  return (
    <input
      {...props}
      onChange={(e) => {
        const result = getUpdateParams(e);
        if (result !== "dec") {
          props.onChange(e, getUpdateParams(e));
        }
      }}
    />
  );
}
