import { FaBook } from "react-icons/fa";
import SocialLinkIcons from "./SocialLinkIcons";
import { ReactComponent as Logo } from "../assets/datax-logo.svg";
import Countdown from "react-countdown";

export default function LandingPage() {
  return (
    <div className="w-full h-full absolute bg-dataXcity bg-cover bg-right mobileBgPosition lg:bg-bottom">
      <nav className="h-16 bg-black bg-opacity-30 flex justify-between items-center px-4">
        <div className="w-1/3 lg:w-auto">
          <Logo className="logo" style={{ height: "40px" }} />
        </div>
        <div className="items-center justify-center text-base lg:text-2xl lg:w-auto hidden lg:flex">
          <h2 className="mr-2 hidden lg:block">Countdown to Launch 🚀</h2>
          <Countdown className="lg:text-2xl" date={new Date("Febrauary 10, 2022 00:00:00")} />
        </div>
        <div className="lg:mr-6 flex justify-end lg:w-auto items-center">
          <a href="https://docs.datax.fi" className="mx-2 hover:text-yellow">
            About DataX
          </a>
          <div className="w-2px h-9 bg-yellow rounded-full" />
          <a href="" className="mx-2 hover:text-yellow">
            Developers
          </a>
        </div>
      </nav>
      <div className="items-center justify-center text-base lg:text-2xl lg:w-auto flex lg:hidden">
        <h2 className="mr-2">Countdown to Launch 🚀</h2>
        <Countdown className="lg:text-2xl" date={new Date("Febrauary 10, 2022 00:00:00")} />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center px-8 lg:px-56 text-center pb-28">
        <div className="text-4xl lg:text-6xl xl:text-8xl font-montserrat font-extrabold text-shadow-bold">
          <h1>
            <span className="mr-4">DATA IS THE NEW</span>
            <span className="line-through text-yellow mr-4">OIL</span>
            <span className="font-grit wiggle">MONEY</span>
          </h1>
        </div>
        <p className="text-xl  xl:text-3xl text-shadow-light mt-4 xl:mt-12">
          DataX turns <span className="text-yellow">Data</span> data into{" "}
          <span className="font-grit underline">Programmable Money</span>{" "}
        </p>
        <ul className="text-5xl py-4 inline-flex mt-4">
          <SocialLinkIcons effect="grow" margin="6" />
        </ul>
        <ul className="inline-flex">
          <a href="https://docs.datax.fi" className="homeButton flex items-center py-2 ml-2 px-3">
            <FaBook className="mr-2" />
            <p>Learn More</p>
          </a>
          {/* <Link to="/tradeX" className="homeButton flex items-center py-2 ml-2 px-3">
            <p>Enter X-Nation</p>
            <FaAngleDoubleRight className="ml-2" />
          </Link> */}
        </ul>
      </div>
    </div>
  );
}
