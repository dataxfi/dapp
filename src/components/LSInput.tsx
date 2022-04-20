import { IToken } from "@dataxfi/datax.js";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { GlobalContext, INITIAL_TOKEN_STATE } from "../context/GlobalState";
import WrappedInput from "./WrappedInput";

export default function ({ updateFunction, pos }: { updateFunction: Function & ChangeEventHandler<HTMLInputElement>; pos: number }) {
  const { token1, token2 } = useContext(GlobalContext);
  const value = pos === 1 ? token1.value.dp(5).toString() : token2.value.dp(5).toString();

  return (
    <DebounceInput
      onChange={updateFunction}
      className="rounded bg-black bg-opacity-0 w-full text-2xl"
      onWheel={(event: React.MouseEvent<HTMLInputElement>) => event.currentTarget.blur()}
      onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
      element={WrappedInput}
      type="number"
      value={value}
      debounceTimeout={500}
      placeholder="0.0"
    />
  );
}
