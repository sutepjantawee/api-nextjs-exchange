import React, { useState, useEffect, useCallback } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import { Line } from "react-chartjs-2";
import { Line as LineJS } from "chart.js/auto";


// let numbers = [];
 
export default function graph() {

  const graph = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_30m"
  );

  
  const [BinanceGarph, setBinanceGarph] = useState([]);
  const [BinanceTime, setBinanceTime] = useState([]);

   
  useEffect(() => {
    graph.onmessage = (event) => {
   
      try {
        const json = JSON.parse(event.data);
        setBinanceTime(prevState => ([...prevState, json.E]))
        setBinanceGarph(prevState => ([...prevState, json.k.c]))
      } catch (err) {}
    }; 

  }, []);


    const data = {
        labels: BinanceTime.map((c) => {
            let date = new Date(c);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return  time ;
          }),
        datasets: [
          {
            label: "BTC/USDT",
            data: BinanceGarph,
            borderColor: 'rgb(75, 192, 192)',
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      };

 

  return (
    <div>
     <div className="flex justify-center mx-12 pt-10"><Line data={data} /></div>
     
      <div className="text-xl">
      <div className="text-center mt-6">Prices : BTC/USDT</div>
      <div className="text-center ">{Math.floor(BinanceGarph).toLocaleString()}</div>
      
      </div>
     
    </div>
  );
}









//   const MyItems = ({items = BinanceGarph}) =>
//   <ul>
//     {items.map((item, i) => <li key={i}>{item}</li>)}
//   </ul>
// console.log(MyItems)

// const data = {
//     labels: ["07:15","07:30","07:45","08:00","08:15","08:30","08:45","09:00","09:45"],
//     datasets: [
//       {
//         label: "BTC/USDT",
//         data: [39699,39797,39639,39717,39736,39669,39767,39736,39807],
//         borderColor: 'rgb(75, 192, 192)',
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//     ],
//   };