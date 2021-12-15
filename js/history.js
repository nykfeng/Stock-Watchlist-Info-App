import BrowserLocalStorage from "./BrowserLocalStorage.js";

export default class history {
  #historyList;
  constructor(ticker) {
    this.#historyList.push(ticker);
  }
}
