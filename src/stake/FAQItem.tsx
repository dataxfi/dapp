import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

export default function LSFAQItem({ QA, FAQOpen, index }: { QA: string[]; FAQOpen: boolean; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!FAQOpen) setIsOpen(false);
  }, [FAQOpen]);

  return (
    <li key={`faq-${index}`} className="rounded-xl text-xs bg-city-blue bg-opacity-30 mt-2 hover:bg-opacity-50">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="text-left w-full font-semibold p-4 flex justify-between items-center"
      >
        {QA[0]}
        {isOpen ? <BsChevronDown /> : <BsChevronRight />}
      </button>
      <Collapse isOpened={isOpen}>
        <p className="p-2">{QA[1]}</p>
      </Collapse>
    </li>
  );
} 
