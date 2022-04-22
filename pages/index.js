import Crypto from "./component/Crypto";
import Graph from "./component/graph"
import Api from "./component/API"

import Coin from "./componentCoin.js/coin"
import TableCoin from "./componentCoin.js/TableCoin"
export default function Home({coins}) {
  
  return (
    <div className="bg-slate-200"> 
  
  {/* <Coin/> */}
 {/* <TableCoin/> */}

    <Api />
      {/* <Crypto /> */}
      {/* <Graph/> */}
    </div>
  );
}
