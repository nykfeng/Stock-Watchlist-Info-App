import Stock from "./Stock.js";

export default class RecentlyViewedListStock extends Stock {
  #lastViewOn;
  #price;
  #changePercent;
  constructor(
    ticker,
    latestPrice,
    lastViewedPrice,
    changePctSinceLast,
    lastViewDate
  ) {
    super(ticker);
    this.#price = latestPrice;
    this.#changePercent = changePct;
    this.#lastViewOn = lastViewDate;
  }
}
