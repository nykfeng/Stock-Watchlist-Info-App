import Stock from "./Stock.js";

export default class StockWatchList extends Stock {
  #price;
  #changePercent;
  constructor(ticker, latestPrice, changePct) {
    super(ticker);
    this.#price = latestPrice;
    this.#changePercent = changePct;
  }
}
