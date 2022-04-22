import React, { useState, useEffect } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import Api from "./Coin";

export default function binance() {
  const [bidsBinanceSOL, setBidsBinanceSOL] = useState([0]);
  const [bidsBitkubSOL, setbidsBitkubSOL] = useState([0]);

  const binanceSOL = new WebSocket(
    "wss://stream.binance.com:9443/ws/solusdt@trade"
  );
  const bitkubSOL = new WebSocket(
    "wss://api.bitkub.com/websocket-api/market.trade.thb_sol"
  );
  useEffect(() => {
    binanceSOL.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsBinanceSOL(json.p);
      } catch (err) {}
    };
    bitkubSOL.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setbidsBitkubSOL(json.rat);
      } catch (err) {}
    };
  });

  const BinanceSOL = Math.floor(bidsBinanceSOL).toLocaleString();
  const BinanceETH = Math.floor(bidsBitkubSOL).toLocaleString();

  return (
    <div>
      {BinanceSOL}
      <br />
      {BinanceETH}
    </div>
  );
}
