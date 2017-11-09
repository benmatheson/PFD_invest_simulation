
Every October, the State of Alaska cuts a check to each man, woman, and child living in the state. The Permanent Fund Divided is: (depending who you ask)

*our share of the oil wealth on state lands
*an attempt to turn non-renewable resource (oil) to a renewable one (diversified global investments)
*universal basic income (Mark Zuckerberg)
*a check on the Alaska Legislature’s desire to spend and grow budgets.
*Payment for living in the state (The Simpson’s Movie I think?)

The checks are a portion of a five-year moving average of fund earnings. And as the bull market has roared back in the past half-decade, checks grew to $2,072.00 per person in 2015. By October, it is DARK in Alaska and winter is well on it’s way. A massive influx of a billion-plus in ($1,272,841,340in 2015) into Alaska’s small economy is well-anticipated.

The newspapers will report the total amount that an Alaskan who has recieved each of the dividends since they began in 1982. This in 2016 was $40,121.41. The impressive (non-inflation adjusted) sum has always struck me as an incomplete sum. What if you were fortunate enough to have squirreled away each dividend in the stock market, specifically a generic S&P 500 index fund and then never touched it?
![screenshot PFD](https://benmatheson.github.io/images/pfd1.png)
I built a calculator that will determine that sum. I used React and Recharts to manage the user input, view changes, state changes, and componetized data visualization.

[PFD Investment Simulator](https://benmatheson.github.io/PFD_invest_simulation/)

The important bits are all tucked into a single handleClick function that takes the user’s first year of recieving a dividend and does some math to see how the investment account would do over the past three decades of stock market moves.

```
   for (var i = a; i < years.length; i++) {
      if (i == a) {
        total = amounts[a];
        valueSequence.push(total);
        yearsArray.push(years[i]);
        
           yearsObj.yr=years[i];
			yearsObj.val = total;
			yearsObjArray.push(yearsObj);
        
                divRetSequence.yr=years[i];
        divRetSequence.div = amounts[i];
        divRetSequence.ret = 0;
               divRetSequenceArray.push(divRetSequence);
        
      } 
      
      
      else {
        total = total * (1 + performances[i]) + amounts[i];
        valueSequence.push(total);
        yearsArray.push(years[i]);
        
        ```
The bottom line: you’d have nearly a quarter million dollars in the bank if you diligently invested each dividend since 1982.

Note: This analysis is rather ballpark: it uses real, annual S&P 500 data, courtesy of NYU Professor Aswath Damodaran and includes dividends. It assumes that the dividend recipient invests the full dividend at year-end. There are no taxes or transaction or investment fees (Vanguard can get you this on in the range of .05% for a no-frills ETF) included.

