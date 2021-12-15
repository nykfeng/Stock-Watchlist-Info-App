export default class Stock {
  #ticker;
  #latestPrice;
  #changePercent;
  #volume;
  constructor(ticker, price, change, vol) {
    this.ticker = ticker;
    this.latestPrice = price;
    this.changePercent = change;
    this.volume = vol;
  }

  get ticker() {
    return this.#ticker;
  }
  set ticker(ticker) {
    this.#ticker = ticker;
  }

  get latestPrice() {
    return this.#latestPrice;
  }

  set latestPrice(price) {
    this.#latestPrice = price;
  }

  get changePercent() {
    return this.#changePercent;
  }

  set changePercent(change) {
    this.#changePercent = change;
  }

  get volume() {
    return this.#volume;
  }

  set volume(vol) {
    this.#volume = vol;
  }
}
