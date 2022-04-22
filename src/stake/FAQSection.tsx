import { useState } from "react";
import { Collapse } from "react-collapse";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import LSFAQItem from "./FAQItem";

export default function FAQSection() {
  const [isOpen, setIsOpen] = useState(false);

  const LSQAS = [
    [
      "What is liquid staking?",
      "Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and receive tradable liquid tokens in return. The DAO-controlled smart contract stakes these tokens using elected staking providers. As users funds are controlled by the DAO, staking providers never have direct access to the users' assets.",
    ],
    [
      "What is the difference between self staking and liquid staking?",
      "Ethereum is soon to be the biggest staking economy in the space. However, staking on ETH 2.0 requires expert knowledge and complex and costly infrastructure. There are several reasons why - the main being the fact that slashing and offline penalties can get very severe if the staking is managed improperly. In addition to this, self-staking brings with it a minimum deposit of 32 ETH and a token lock-up which could last years.",
    ],
    [
      "What is liquid staking?",
      "Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and receive tradable liquid tokens in return. The DAO-controlled smart contract stakes these tokens using elected staking providers. As users funds are controlled by the DAO, staking providers never have direct access to the users' assets.",
    ],
    [
      "What is the difference between self staking and liquid staking?",
      "Ethereum is soon to be the biggest staking economy in the space. However, staking on ETH 2.0 requires expert knowledge and complex and costly infrastructure. There are several reasons why - the main being the fact that slashing and offline penalties can get very severe if the staking is managed improperly. In addition to this, self-staking brings with it a minimum deposit of 32 ETH and a token lock-up which could last years.",
    ],
  ];

  return (
    <div className="w-full rounded-2xl p-2 bg-black opacity-90" style={{ transition: "height 500ms" }}>
      <button
        className="w-full text-left font-bold text-sm hover:bg-white rounded-lg hover:bg-opacity-10 px-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        FAQ {isOpen ? <BsChevronDown /> : <BsChevronRight />}
      </button>
      <Collapse isOpened={isOpen}>
        <ul>
          {LSQAS.map((qa, index) => (
            <LSFAQItem QA={qa} FAQOpen={isOpen} index={index} />
          ))}
        </ul>
      </Collapse>
    </div>
  );
}
