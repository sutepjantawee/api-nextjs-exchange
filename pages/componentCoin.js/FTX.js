import React from "react";

export default function FTX(props) {
  const { coins } = props;
  return (
    <div>
      <div className="bg-zinc-100 border-2 my-6 text-center py-4 rounded-lg shadow-lg">
        {coins}
      </div>
    </div>
  );
}
