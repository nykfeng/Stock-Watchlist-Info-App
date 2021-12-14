export default class Stock {
  #ticker;
  constructor(ticker) {
    this.#ticker = ticker;
  }

  get ticker() {
    return this.#ticker;
  }
  //   set ticker(ticker) {
  //     this.#ticker = ticker;
  //   }
}
