import React, { useEffect, useState, userRef } from "react";
import { Block } from "./Block";
import "./index.scss";
// import data from "./data/data.json";
function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);

  //вместо useState делаем hook ratesRef
  const [rates, setRates] = useState({});
  // console.log(rates);

  // const ratesRef = userRef({});

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        // setRates асинхронная функция
        setRates(json.Valute);
        // ratesRef.current = json.Valute;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Can't find any information");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency].Value;
    const result = price * rates[toCurrency].Value;
    // сделано без учета номинала rates[fromCurrency].Nominal;
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (rates[fromCurrency].Value / rates[toCurrency].Value) * value;
    // сделано без учета номинала rates[fromCurrency].Nominal;
    setFromPrice(result.toFixed(3));
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
  // }, [fromCurrency]);

  // useEffect(() => {
  //   onChangeToPrice(toPrice);
  // }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency} //setFromCurrency   onChangeFromCurrency
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency} //setToCurrency  onChangeToCurrency
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;

// const onChangeFromPrice = React.useCallback(
//   (value) => {
//     const price = value / ratesRef.current[fromCurrency].Value;
//     const result = price * ratesRef.current[toCurrency].Value;
//     // сделано без учета номинала rates[fromCurrency].Nominal;
//     setToPrice(result);
//     setFromPrice(value);
//   },
//   [fromCurrency, toCurrency, ratesRef]
// );
// const onChangeToPrice = React.useCallback(
//   (value) => {
//     const result =
//       (ratesRef.current[fromCurrency].Value /
//         ratesRef.current[toCurrency].Value) *
//       value;
//     // сделано без учета номинала rates[fromCurrency].Nominal;
//     setFromPrice(result);
//     setToPrice(value);
//   },
//   [fromCurrency, toCurrency, ratesRef]
// );
// useEffect(() => {
//   fetch("https://www.cbr-xml-daily.ru/daily_json.js")
//     .then((res) => res.json())
//     .then((json) => {
//       // setRates асинхронная функция
//       // setRates(json.Valute);
//       ratesRef.current = json.Valute;
//       onChangeToPrice(1);
//     })
//     .catch((err) => {
//       console.warn(err);
//       alert("Can't find any information");
//     });
// }, [ratesRef, onChangeToPrice]);
