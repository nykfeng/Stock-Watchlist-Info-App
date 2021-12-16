import WatchListStock from "./WatchlistStock.js";
import BrowserLocalStorage from "./BrowserLocalStorage.js";

export default class WatchList {
  #listName;
  #stockOnList;
  constructor(listName, watchListStocks = null) {
    this.#listName = listName;
    this.#stockOnList = watchListStocks;
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

  addStockToList(stock) {
    this.#stockOnList.push(stock);
  }

  get stockOnList() {
    return this.#stockOnList;
  }
}
