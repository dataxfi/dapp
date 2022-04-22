import React from "react";

export default function MiddleContainer(props:React.HTMLProps<HTMLAllCollection>) {
  return (
    <div className="px-2 w-full h-full relative flex flex-grow">
      <div className="absolute top-0 left-0 right-0 bottom-0 pb-10 lg:pb-0">
          {props.children}
      </div>
    </div>
  );
}
