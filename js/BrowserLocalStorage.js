export default class BrowserLocalStorage {
  static getAllStocks(list) {
    const stockList = JSON.parse(
      localStorage.getItem(`${list}-watchlist`) || "[]"
    );

    return stockList;
  }

  static addStock(stockToAdd, list) {
    const stockList = BrowserLocalStorage.getAllStocks(list);
    const existing = stockList.find(
      (stock) => stock.ticker === stockToAdd.ticker
    );

    if (!existing) {
      stockList.push(stockToAdd);
    }
    localStorage.setItem(`${list}-watchlist`, JSON.stringify(stockList));
  }

  static deleteStock(stockToDel, list) {
    const stockList = BrowserLocalStorage.getAllStocks(list);
    const newStockList = stockList.filter(
      (stock) => stock.ticker != stockToDel
    );

    localStorage.setItem(`${list}-watchlist`, JSON.stringify(stockList));
  }

  static sortStock(stockProperty, list, asc = true) {
    const stockList = BrowserLocalStorage.getAllStocks(list);
    const dirModifier = asc ? 1 : -1;

    stockList.sort((a, b) => {
      return a[stockProperty] < b[stockProperty]
        ? dirModifier * 1
        : dirModifier * -1;
    });

    localStorage.setItem(`${list}-watchlist`, JSON.stringify(stockList));
  }
}
