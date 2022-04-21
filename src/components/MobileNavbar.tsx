import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import PendingTxsIndicator from "./PendingTxsIndicator";
import { INavText } from "../utils/types";
import OutsideClickHandler from "react-outside-click-handler";

const MobileNavbar = ({
  links,
  truncateId,
  network,
  handleModalOrConnect,
}: {
  links: Array<{ name: string; link: string }>;
  text: INavText;
  wallet: string;
  truncateId: Function;
  network: JSX.Element;
  handleModalOrConnect: Function;
}) => {
  const { accountId, bgOff } = useContext(GlobalContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [walletBtnVis, setWalletBtnVis] = useState(false);

  function toggleMenu(state: boolean) {
    setMenuVisible(state);
  }

  const location = useLocation();

  useEffect(() => {
    toggleMenu(false);
  }, [location]);

  useEffect(() => {
    setWalletBtnVis(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  return (
    <header id="mobileNavbar" className="flex flex-col lg:hidden">
      <div className={`flex lg:hidden headerGrad  justify-between items-center py-2 border-gray-800 pr-4`}>
        <div className="flex flex-row justify-start ml-4">
          <Link to={"/"} className="lg:w-auto font-spectral text-3xl">
            Datapolis
            <div className="px-2">
              <div className="w-full h-2px bg-yellow">
                <div className="w-1/4 h-2px" style={{ backgroundColor: "#e77f24" }} />
              </div>
            </div>
            <div className="w-full flex justify-end font-spectral text-xs pr-2">
              <p>Beta</p>
            </div>
          </Link>
        </div>
        <div className="flex">
          <PendingTxsIndicator />
          <div className="pl-5">
            {menuVisible ? (
              <button>
                <MdClose onClick={() => toggleMenu(false)} color="#ccc" size="28" className="z-20" />
              </button>
            ) : (
              <button>
                <MdMenu onClick={() => toggleMenu(true)} className="z-20" color="#ccc" size="28" />{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={()=>{setMenuVisible(false)}}>
        <div
          className={`w-full bg-black bg-opacity-75 z-10  mb-5 absolute top-0 transform${
            menuVisible ? " translate-y-3/4" : " -translate-y-full"
          } transition duration-1000 border-t border-b lg:-translate-y-19`}
        >
          {links.map((link, idx) => {
            return (
              <Link onClick={() => toggleMenu(false)} to={link.link} className="hm-link product" key={`link${idx}`}>
                <div key={idx} className="py-1.5 px-8 hover:bg-white hover:bg-opacity-10">
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
      </OutsideClickHandler>

      <div className={`fixed bottom-0 left-0 w-full py-2 lg:hidden flex justify-center mobileGrad transform ${walletBtnVis ? "" : "translate-y-12"} transition duration-1000 z-10`}>
        <div className="flex flex-row w-full justify-between px-3 items-center">
          <div className="flex flex-row justify-center align-middle  w-full ">
            <div className={`flex flex-row bg-primary-900 ${accountId ? "pl-2" : ""}  px-1 py-1 rounded-lg`}>
              {" "}
              <div className="text-xs self-center rounded-l-lg">{accountId ? <span>{network}</span> : null}</div>
              <button
                id={`${accountId ? "m-view-txs-btn" : "m-wallet-button"}`}
                onClick={() => handleModalOrConnect()}
                className={`hm-btn text-xs px-1 ${accountId ? "ml-2 " : ""} py-1 bg-black rounded`}
              >
                {accountId ? `${truncateId()}` : "Connect wallet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;
