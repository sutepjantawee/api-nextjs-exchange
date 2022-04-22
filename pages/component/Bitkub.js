import Image from "next/image";
import btc from "../img/opengraph.png";
import eth from "../img/pngegg.png";

const Coin = ({
  BinanceBTC,
  BinanceETH,
  BitkupBTC,
  BitkupETH,
  BinanceSOL,
  BitkupSOL,
}) => {
  return (
    <div>
      <div className="text-center text-3xl pt-10 pb-5 text-zinc-700">
        Exchange Compare Cryptocurrency Prices
      </div>
      <div class="flex flex-col mx-10 ">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center ">
                <thead class="border-b bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-100 text-xl justify-items-center">
                  <tr>
                    <th scope="col" class="font-medium px-6 py-4 border-r ">
                      <p>Name</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Bitkup</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Binance</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b bg-violet-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">BTC-THB</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={btc} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BitkupBTC}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BinanceBTC}
                    </td>
                  </tr>

                  <tr class="border-b bg-indigo-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">ETH-THB</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={eth} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BitkupETH}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BinanceETH}
                    </td>
                  </tr>

                  <tr class="border-b bg-indigo-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">SOL-THB</p>
                      <p className="w-12 pt-2 ml-3"></p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BinanceSOL}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {BitkupSOL}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;
