import Stock from "./Stock.js";

export default class WatchListStock {
  stockList = [];

  constructor(stock) {
    this.stockList.push(stock);
  }

  add(stock) {
    this.stockList.push(stock);
  }
}
