```javascript
const getNoOfStocksToBuyForAverage = (
  noOfExistingStocks,
  avgForExistingStock,
  currentPrice,
  avgPriceYouLooking,
  incrementStocksBy=1
) => {
    let noOfStocksToBuy = 0;

    let resultedAvg = avgForExistingStock;

    // This is the amount you have lost so far and wanted to recover
    const yourLostSofar =
      avgForExistingStock * noOfExistingStocks - currentPrice * noOfExistingStocks;

    do {
      const totalStocks = noOfStocksToBuy + noOfExistingStocks;
      // const totalPriceYouSpentOnStocks = totalStocks * avgPriceYouLooking;
      const t = noOfStocksToBuy * currentPrice + yourLostSofar;
      resultedAvg = t / totalStocks;
      if (avgPriceYouLooking < resultedAvg) {
        noOfStocksToBuy += incrementStocksBy;
      }
    } while (avgPriceYouLooking < resultedAvg);

    const youHaveToSpend= noOfStocksToBuy * currentPrice
    return { noOfStocksToBuy, resultedAvg, youHaveToSpend};
};
// No of Existing stocks you have
const noOfExistingStocks = 2000;
const avgForExistingStock = 0.8658;
// Current stock price
const currentPrice = 0.1397;
// TO make average down 
const avgPriceYouLooking = 0.15;
// it's an optional
const incrementStocksBy = 10;

const result = getNoOfStocksToBuyForAverage(
  noOfExistingStocks,
  avgForExistingStock,
  currentPrice,
  avgPriceYouLooking,
  incrementStocksBy
);

console.log('To make an average: ', result.resultedAvg);
console.log('You should buy: ', result.noOfStocksToBuy);
console.log('Which will cost: ', result.youHaveToSpend)
```
Output would be:
- To make an average:  0.14999946430139632
- You should buy:  111870
- Which will cost:  15628.239
