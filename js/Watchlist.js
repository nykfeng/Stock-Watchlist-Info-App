import WatchListStock from "./WatchListStock.js";
import BrowserLocalStorage from "./BrowserLocalStorage.js";

export default class WatchList {
  #listName;
  #stockOnList;
  constructor(listName, watchListStocks) {
    this.#listName = latestPrice;
    this.#stockOnList.push(watchListStocks);
  }

  get listName() {
    return this.#listName;
  }
  set listName(name) {
    this.#listName = name;
  }

  deleteListStock(stock) {
    this.#stockOnList.indexOf(); // TODO
  }
}
