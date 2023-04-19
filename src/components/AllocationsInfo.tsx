import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function AllocationInfo({
  leftHeading,
  rightHeading,
  rightValue,
  leftVaue,
}: {
  leftHeading: String;
  rightHeading: String;
  rightValue: number;
  leftVaue: number;
}) {
  return (
    <>
      <div className="rounded-lg border allocation-holder  px-4 py-2  flex justify-around ">
        <div className="flex flex-col text-center">
          <h5>{leftHeading}</h5>
          <span>{leftVaue}</span>
        </div>
        <div className="flex flex-col text-center">
          <h5>{rightHeading}</h5>
          <small className="bg-neutral-300">{rightValue}</small>
        </div>
      </div>
    </>
  );
}
