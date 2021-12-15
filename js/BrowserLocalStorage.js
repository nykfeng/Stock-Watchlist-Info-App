export default class BrowserLocalStorage {
  static getAllStocksFromWatchlist(list) {
    const stockList = JSON.parse(localStorage.getItem(list) || "[]");

    return stockList;
  }

  static getAllWatchlists() {
    const watchlists = JSON.parse(localStorage.getItem(`watchlists`) || "[]");

    return watchlists;
  }

  static addStockToWatchlist(stockToAdd, list) {
    const stockList = BrowserLocalStorage.getAllStocksFromWatchlist(list);
    const existing = stockList.find(
      (stock) => stock.ticker === stockToAdd.ticker
    );

    if (!existing) {
      stockList.push(stockToAdd);
    }
    localStorage.setItem(list, JSON.stringify(stockList));
  }

  static deleteStockFromWatchlist(stockToDel, list) {
    const stockList = BrowserLocalStorage.getAllStocksFromWatchlist(list);
    const newStockList = stockList.filter(
      (stock) => stock.ticker != stockToDel.ticker
    );

    localStorage.setItem(list, JSON.stringify(newStockList));
  }

  static sortStockOnWatchlist(stockProperty, list, asc = true) {
    const stockList = BrowserLocalStorage.getAllStocksFromWatchlist(list);
    const dirModifier = asc ? 1 : -1;

    stockList.sort((a, b) => {
      return a[stockProperty] < b[stockProperty]
        ? dirModifier * 1
        : dirModifier * -1;
    });

    localStorage.setItem(list, JSON.stringify(stockList));
  }

  static addWatchlist(list) {
    const watchlists = BrowserLocalStorage.getAllWatchlists();
    const existing = watchlists.find((watchlist) => watchlist === list);

    if (!existing) {
      watchlists.push(list);
    }
    localStorage.setItem(`watchlists`, JSON.stringify(watchlists));
  }

  static deleteWatchlist(list) {
    const watchlists = BrowserLocalStorage.getAllWatchlists();
    const newWatchlists = watchlists.filter((watchlist) => watchlist !== list);
    localStorage.setItem(`watchlists`, JSON.stringify(newWatchlists));
  }

  static renameWatchlist(list, newList) {
    const watchlists = BrowserLocalStorage.getAllWatchlists();
    const newWatchlists = watchlists.map((watchlist) => {
      if (watchlist === list) {
        return newList;
      } else {
        return watchlist;
      }
    });

    localStorage.setItem(`watchlists`, JSON.stringify(newWatchlists));
  }
}
