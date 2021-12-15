import Stock from "./Stock.js";

export default class WatchListStock extends Stock {
  #price;
  #changePercent;
  #volume;
  constructor(ticker, latestPrice, changePct, volume) {
    super(ticker);
    this.#price = latestPrice;
    this.#changePercent = changePct;
    this.#volume = volume;
  }
}
