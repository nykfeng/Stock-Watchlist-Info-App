const add = function (stockTicker) {
  return new TradingView.MediumWidget({
    symbols: [[`${stockTicker}`]],
    chartOnly: false,
    width: "100%",
    height: "400px",
    locale: "en",
    colorTheme: "light",
    gridLineColor: "rgba(255, 255, 255, 0)",
    fontColor: "#787B86",
    isTransparent: false,
    autosize: true,
    showFloatingTooltip: true,
    showVolume: true,
    scalePosition: "no",
    scaleMode: "Normal",
    fontFamily: "Trebuchet MS, sans-serif",
    noTimeScale: false,
    chartType: "area",
    lineColor: "#2962FF",
    bottomColor: "rgba(41, 98, 255, 0)",
    topColor: "rgba(41, 98, 255, 0.3)",
    container_id: `tradingview_${stockTicker}`,
  });
};

export default {
  add,
};
