import { useState } from "react";
import { Collapse } from "react-collapse";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

export default function LSFAQItem({ QA }: { QA: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-xl bg-city-blue bg-opacity-30 my-2 hover:bg-opacity-50">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="text-left w-full font-semibold p-4 flex justify-between items-center"
      >
        {QA[0]}{isOpen ? <BsChevronDown /> : <BsChevronRight />}
      </button>
      <Collapse isOpened={isOpen}>
        <p className="p-2">{QA[1]}</p>
        
      </Collapse>
    </div>
  );
}
