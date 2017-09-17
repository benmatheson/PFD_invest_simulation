"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  //setting inital state

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      yearState: 0,
      total: 0,
      valueSequence: "",
      yearsArray: "",
      sumOfContributions: 0,
      totalContributions: 0,
      difference: 0,
      isVisible: "none",
      yearsObjArray: "",
      divRetSequenceArray: ""

    };

    _this.handleChange = _this.handleChange.bind(_this);
    ///this.simulation = this.simulation.bind(this);
    return _this;
  }

  //event handler

  App.prototype.handleChange = function handleChange(event) {

    {
      {
        this.state.isVisible;
      }
    }

    var userInput = document.getElementById("inputForm").value;

    if (isNaN(userInput) || userInput < 1981 || userInput > 2016) {

      alert('Please select a year between 1982 and 2016 in which you recieved your first PFD');
    } else {

      event.preventDefault();
      var updatedYear = parseInt(this.refs.newYear.value);
      console.log("updddd" + updatedYear);
      console.log("type" + (typeof updatedYear === "undefined" ? "undefined" : _typeof(updatedYear)));
      this.setState({ yearState: updatedYear });
      // this.setState({color: newColor});

      ///here starts the BIG simulation
      console.log("first" + this.state.yearState);
      var year = updatedYear;

      console.log("YEEEER" + year);
      var performances = [0.2042, 0.2234, 0.0615, 0.3124, 0.1849, 0.0581, 0.1654, 0.3148, -0.0306, 0.3023, 0.0749, 0.0997, 0.0133, 0.372, 0.2268, 0.331, 0.2834, 0.2089, -0.0903, -0.1185, -0.2197, 0.2836, 0.1074, 0.0483, 0.1561, 0.0548, -0.3655, 0.2594, 0.1482, 0.021, 0.1589, 0.3215, 0.1352, 0.0138, 0.1174];
      var years = [1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
      var amounts = [1000, 386.15, 331.29, 404, 556.26, 708.19, 826.93, 873.16, 952.63, 931.34, 915.84, 949.46, 983.9, 990.3, 1130.68, 1296.54, 1540.88, 1769.84, 1963.86, 1850.28, 1540.76, 1107.56, 919.84, 845.76, 1106.96, 1654, 2069, 1305, 1281, 1174, 878, 900, 1884, 2072, 1022];
      var total;

      // the index of the year will match up with returns and PFD amounts for this final value calculation
      var a = years.indexOf(year);
      var startingAmount = amounts[a];

      //initialize empty arrays

      var valueSequence = [];
      var yearsArray = [];

      var yearsObjArray = [];
      var yearsObj = {};
      var contSequence = [];

      var divRetSequence = {};
      var divRetSequenceArray = [];

      /// UNNCECDSSARY ? var firstYear = startingAmount * (1+performances[a]);

      // loop through years array. for the starting year, there is no compounding,
      //for the following years, the total from the previous year is multiplied
      //by the S&P500 return, followed by the addition of the year's dividend

      for (var i = a; i < years.length; i++) {
        if (i == a) {
          total = amounts[a];
          valueSequence.push(total);
          yearsArray.push(years[i]);

          yearsObj.yr = years[i];
          yearsObj.val = total;
          yearsObjArray.push(yearsObj);

          divRetSequence.yr = years[i];
          divRetSequence.Dividend = amounts[i];
          divRetSequence.Return = 0;
          divRetSequenceArray.push(divRetSequence);
        } else {
          total = total * (1 + performances[i]) + amounts[i];
          valueSequence.push(total);
          yearsArray.push(years[i]);

          var previousVal;
          divRetSequence = {};
          divRetSequence.yr = years[i];
          divRetSequence.Dividend = amounts[i];

          //takes current total, subtracts this years dividend then subtrats previous  year's total.

          //THIS IS WRONG
          console.log(JSON.stringify("value seq right before deining fal    " + valueSequence));

          //the previous year's total:                    
          previousVal = valueSequence[valueSequence.length - 2];
          //the return for hte year is the current year total minus the years dividend munus the previous year's total

          divRetSequence.Return = (total - amounts[i] - previousVal).toFixed(2);

          divRetSequenceArray.push(divRetSequence);

          console.log("divretSeqOBJ" + JSON.stringify(divRetSequence));console.log("divretSeqarray" + JSON.stringify(divRetSequenceArray));

          yearsObj = {};
          yearsObj.yr = years[i];

          yearsObj.val = parseFloat(total.toFixed(2));

          yearsObjArray.push(yearsObj);
        }
      }

      var sumOfContributions = amounts.slice(a, amounts.length);
      var totalContributions = sumOfContributions.reduce(function (a, b) {
        return a + b;
      });

      var difference = total - totalContributions;
      //caculates the difference between the compounded final value and the
      //raw PFD contributions
      console.log("DA TOTAL CONTR" + totalContributions);
      console.log("seq" + valueSequence);
      // a final object that's returned.

      this.setState({
        total: total,
        valueSequence: valueSequence,
        yearsArray: yearsArray,
        sumOfContributions: sumOfContributions,
        totalContributions: totalContributions,
        difference: difference,
        isVisible: "block",
        yearsObjArray: yearsObjArray,
        divRetSequenceArray: divRetSequenceArray

      });
    }
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "main" },
      " ",
      React.createElement("i", { className: "animated  bounce bounceInDown fa fa-line-chart fa-5x", "aria-hidden": "false" }),
      React.createElement(
        "h1",
        { className: "animated fadeInDown" },
        "What If You Had Invested Your PFD?"
      ),
      React.createElement(
        "h3",
        { id: "sub" },
        "Enter the first year you recieved an Alaska Permanent Fund Dividend (1982 on) to see what you would have earned by investing it in the stock market each year. "
      ),
      React.createElement(
        "form",
        { onSubmit: this.handleChange },
        React.createElement("input", { placeholder: "e.g. 1996", type: "text", id: "inputForm", ref: "newYear" }),
        React.createElement("input", { type: "submit" }),
        React.createElement(
          "div",
          { id: "para", className: "graph animated bounceInUp", style: { display: this.state.isVisible } },
          " ",
          React.createElement(
            "p",
            { className: "graph animated bounceInUp" },
            "Your account would have reached a value of ",
            React.createElement(
              "span",
              { id: "high" },
              " ",
              React.createElement(
                "strong",
                null,
                "$ ",
                this.state.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              ),
              " "
            ),
            "by 2017 if you had invested every dividend in an S&P 500 index fund and left it alone for",
            React.createElement(
              "span",
              null,
              " ",
              2017 - this.state.yearState
            ),
            " years.  ",
            React.createElement("br", null),
            React.createElement("br", null),
            " You would have invested a total of",
            " ",
            React.createElement(
              "strong",
              null,
              React.createElement(
                "span",
                { id: "high" },
                "$ ",
                this.state.totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              )
            ),
            ", from your dividends, while your stock investments would have earned you",
            React.createElement(
              "span",
              { id: "high" },
              React.createElement(
                "strong",
                null,
                "$ ",
                this.state.difference.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              )
            ),
            ", accounting for ",
            React.createElement(
              "span",
              { id: "high" },
              React.createElement(
                "strong",
                null,
                (this.state.difference / this.state.total * 100).toFixed(1)
              ),
              " "
            ),
            "percent of your total balance.   "
          )
        ),
        " ",
        React.createElement("br", null)
      ),
      React.createElement(
        "div",
        { id: "result", style: { display: this.state.isVisible } },
        React.createElement(
          "h2",
          { style: { display: this.state.isVisible } },
          "How your money grew over the years"
        ),
        React.createElement(Graph, { className: "chart", dataValue: this.state.yearsObjArray, ass: this.state.yearState }),
        React.createElement(
          "h2",
          { style: { display: this.state.isVisible } },
          "How much did stock earnings contribute? "
        ),
        React.createElement(Cake, { className: "chart", differenceProp: this.state.difference, totalProp: this.state.totalContributions }),
        React.createElement(
          "h3",
          { style: { display: this.state.isVisible } },
          "The dividends amounted to only a portion of the final total. The longer you have held your money in the stock market, the more of your final account value comes from earnings related to company growth and regular dividends."
        ),
        React.createElement(
          "h2",
          { style: { display: this.state.isVisible } },
          "Ups and downs along the way"
        ),
        React.createElement(BarReturn, { className: "chart", divRetSequenceArray: this.state.divRetSequenceArray }),
        React.createElement("br", null),
        React.createElement(
          "p",
          { id: "foot" },
          "Note: This analysis is simplified: it uses real, annual S&P 500 data, courtesy of NYU Professor Aswath Damodaran and includes dividends. It assumes that the dividend recipient invests the full dividend at year-end. There are no taxes or transaction or investment fees (Vanguard can get you this on in the range of .05% for a no-frills ETF) included."
        )
      )
    );
  };

  return App;
}(React.Component);

///starging the damn line chart

var _Recharts = Recharts;
var LineChart = _Recharts.LineChart;
var Line = _Recharts.Line;
var XAxis = _Recharts.XAxis;
var YAxis = _Recharts.YAxis;
var CartesianGrid = _Recharts.CartesianGrid;
var Tooltip = _Recharts.Tooltip;
var Legend = _Recharts.Legend;
var PieChart = _Recharts.PieChart;
var Pie = _Recharts.Pie;
var Cell = _Recharts.Cell;
var BarChart = _Recharts.BarChart;
var Bar = _Recharts.Bar;
var ReferenceLine = _Recharts.ReferenceLine;

var Graph = function (_React$Component2) {
  _inherits(Graph, _React$Component2);

  function Graph() {
    _classCallCheck(this, Graph);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Graph.prototype.render = function render() {
    var dat99 = this.props.dataValue;
    //var thatAss = this.props.ass;

    return React.createElement(
      LineChart,
      { width: 900, height: 400, data: dat99,
        margin: { top: 5, right: 20, left: 20, bottom: 5 } },
      React.createElement(XAxis, { dataKey: "yr" }),
      React.createElement(YAxis, null),
      React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
      React.createElement(Tooltip, null),
      React.createElement(Legend, null),
      React.createElement(Line, { name: "Value of Investment", type: "monotone", dataKey: "val", stroke: "#144087", activeDot: { r: 8 } })
    );
  };

  return Graph;
}(React.Component);

var Cake = function (_React$Component3) {
  _inherits(Cake, _React$Component3);

  function Cake() {
    _classCallCheck(this, Cake);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Cake.prototype.render = function render() {

    var COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    var dataDiff = this.props.differenceProp;
    var dataTotal = this.props.totalProp;
    var pieData = [];

    //Vanguard
    //calpers
    //chicago
    //https://ftalphaville.ft.com/

    var pieDataObj1 = {};
    pieDataObj1.name = "Dividends";
    pieDataObj1.value = parseFloat(dataTotal.toFixed(4));
    //RIGHT HERE:
    console.log("LOG" + pieDataObj1);

    var pieDataObj2 = {};
    pieDataObj2.name = "Investment Earnings";
    pieDataObj2.value = parseFloat(dataDiff.toFixed(2));
    pieData.push(pieDataObj1, pieDataObj2);
    console.log("STRINGING THE OBJ");
    console.log("PIEDATA" + JSON.stringify(pieData));
    return React.createElement(
      PieChart,
      { width: 900, height: 500 },
      React.createElement(
        Pie,
        { data: pieData, cx: 400, cy: 200, innerRadius: 90, outerRadius: 150, label: true, fill: "#82ca9d" },
        pieData.map(function (entry, index) {
          return React.createElement(Cell, { fill: COLORS[index % COLORS.length] });
        }),
        " >"
      ),
      React.createElement(Legend, null),
      React.createElement(Tooltip, null)
    );
  };

  return Cake;
}(React.Component);

var BarReturn = function (_React$Component4) {
  _inherits(BarReturn, _React$Component4);

  function BarReturn() {
    _classCallCheck(this, BarReturn);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  BarReturn.prototype.render = function render() {
    var barData = this.props.divRetSequenceArray;
    console.log("bar dattt" + barData);
    return React.createElement(
      BarChart,
      { width: 900, height: 500, data: barData, stackOffset: "sign",
        margin: { top: 20, right: 30, left: 20, bottom: 5 } },
      React.createElement(XAxis, { dataKey: "yr" }),
      React.createElement(YAxis, null),
      React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
      React.createElement(Tooltip, null),
      React.createElement(Legend, null),
      React.createElement(Bar, { dataKey: "Dividend", stackId: "a", fill: "#8884d8" }),
      React.createElement(Bar, { dataKey: "Return", stackId: "b", fill: "red" }),
      React.createElement(ReferenceLine, { y: 0, stroke: "#000" })
    );
  };

  return BarReturn;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));