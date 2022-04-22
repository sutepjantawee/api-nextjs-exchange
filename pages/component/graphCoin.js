import React, { useState, useEffect, useCallback } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import { Line } from "react-chartjs-2";
import { Line as LineJS } from "chart.js/auto";

export default function graphCoin({ dataCoin }) {

    const BinanceBTC = dataCoin.BinanceBTC;
//   const BinanceETH = dataCoin.BinanceETH;
    console.log(dataCoin);
    const graph = new WebSocket(
        "wss://stream.binance.com:9443/ws/btcusdt@kline_30m"
      );
      const bitkubBTC = new WebSocket(
        "wss://api.bitkub.com/websocket-api/market.trade.thb_btc"
      );
    
      
      const [BinanceGarph, setBinanceGarph] = useState([]);
      const [BinanceTime, setBinanceTime] = useState([]);
      const [BitkupBTC, setBitkupBTC] = useState([]);
       
      useEffect(() => {
        graph.onmessage = (event) => {
       
          try {
            const json = JSON.parse(event.data);
            setBinanceTime(prevState => ([...prevState, json.E]))
            setBinanceGarph(prevState => ([...prevState, json.k.c]))
          } catch (err) {}
        }; 
        bitkubBTC.onmessage = (event) => {
       
          try {
            const json = JSON.parse(event.data);
            setBitkupBTC(prevState => ([...prevState, json.rat]))
          } catch (err) {}
        }; 
    
      }, []);
    
    const BinanceGarphTHB = (BinanceGarph * 33.5)
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
                data: BinanceGarph  ,
                borderColor: 'rgb(50, 192, 192)',
                fill: true,
                backgroundColor: "rgba(50,192,192,0.2)",
                borderColor: "rgba(54,192,192,1)",
              },
              // {
              //   label: "BTC/USDT",
              //   data: BitkupBTC  ,
              //   borderColor: 'rgb(75, 192, 192)',
              //   fill: true,
              //   backgroundColor: "rgba(75,192,192,0.2)",
              //   borderColor: "rgba(75,192,192,1)",
              // },
            ],
            
          }
     
    
      return (
        <div>
         <div className="flex justify-center mx-12 pt-10"><Line data={data} /></div>
         
          <div className="text-xl">
          <div className="text-center mt-6">Prices : BTC/USDT</div>
          <div className="text-center ">{Math.floor(BinanceGarph).toLocaleString()}</div>
          
          </div>
         
        </div>
      );}
