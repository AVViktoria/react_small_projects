import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";
// import data from "./data/data.json";
function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});
  // console.log(rates);
  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.Valute);
        // console.log(json.Valute);
      })
      .catch((err) => {
        console.warn(err);
        alert("Can't find any information");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency].Value;
    const result = price * rates[toCurrency].Value;
    // console.log(rates[fromCurrency].Value);
    // сделано без учета номинала rates[fromCurrency].Nominal;
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (rates[fromCurrency].Value / rates[toCurrency].Value) * value;
    // сделано без учета номинала rates[fromCurrency].Nominal;
    setFromPrice(result);
    setToPrice(value);
  };
  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    onChangeFromPrice(fromPrice);
  };
  const onChangeToCurrency = (cur) => {
    setToCurrency(cur);
    onChangeToPrice(toPrice);
  };

  //need to fix, because work with two presses on valute name
  // useEffect(() => {
  //   onChangeFromPrice(fromPrice);
  // }, [fromCurrency, fromPrice]);

  // useEffect(() => {
  //   onChangeToPrice(toPrice);
  // }, [toCurrency, toPrice]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency} //setFromCurrency
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency} //setToCurrency
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
